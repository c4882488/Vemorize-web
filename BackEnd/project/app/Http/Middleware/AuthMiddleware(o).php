<?php
namespace App\Http\Middleware;
use Closure;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Models\User as UserModel;

class AuthMiddleware{
    public function handle($request, Closure $next){
        if($request->method()=="OPTIONS"){
            $message ="test";
            return response($message, 200);
        }
       switch ($request->path()) {
            case 'doLogin':
                $email = $request->input("email");
                $password = $request->input("password");
                if(empty($email) OR empty($password)){
                    $message = '缺少必填欄位';
                    return response(["message" => $message], 403);
                }
                else{
                    $this->usermodel = new UserModel();
                    $response = $this->usermodel->checkLogin($email, $password);
                    $c = count($response);
                    if($c==1){
                        $token = $this->genToken($email);
                        $response = $this->usermodel->updateToken($email, $token);
                        $message = '登入成功';
                        return response(["message"=>$message, 'token'=> $token], 200);
                    }
                    else{
                        $message = '帳號或密碼錯誤';
                        return response(["message" => $message], 403);
                        
                    }
                };
            case 'register':
                //登錄帳號
                $name = $request->input("name");
                $email = $request->input("email");
                $password = $request->input("password");
                $birthday = $request->input("birthday");
                if(empty($name) OR empty($email) OR empty($password) OR empty($birthday)){
                    $message = '缺少必填欄位';
                    return response(["message" => $message], 400);
                }
                else{
                    $this->usermodel = new UserModel();
                    $response = $this->usermodel->checkEmail($email);
                    $c = count($response);
                    if($c==1){
                        $message = '信箱已存在';
                        return response(["message" => $message], 409);
                    }
                    else{
                        $sql = "insert into user (user_name, user_email, user_password, user_birthday) values (:name, :email, :password, :user_birthday)";
                        $response = DB::insert($sql,[$name, $email, $password, $birthday]);
                        if($response){
                            $message = '註冊成功';
                            return response(["message" => $message], 200);
                        }
                        else{
                            $message = 'SQL錯誤';
                            return response(["message" => $message], 405);
                        }
                        
                    }
                };
                break;
            case 'doLogout':
                //我不知道
                $message = '我不知道';
                return response(["message" => $message], 200);
            case 'checkEmail':
                $email = $request->input('email');
                if(empty($email)){
                    $message = '缺少必填欄位';
                    return response(["message" => $message], 400);
                }
                else{
                    $this->usermodel = new UserModel();
                    $response = $this->usermodel->checkEmail($email);
                    if(count($response)!=0){
                        $message = '信箱已存在';
                        return response(["message" => $message], 406);
                    }
                    else{
                        $message = '信箱可註冊';
                        return response(["message" => $message], 200);
                    }
                }
                break;
            default:
                $jwtToken = $request->header('jwtToken');
                if(empty($jwtToken)){
                    $message = '缺少Token';
                    return response(["message" => $message], 400);
                }
                else{
                    if($this->checkToken($request)){
                        return $next($request);
                    }
                    else{
                        $message = '無效Token';
                        return response(["message" => $message], 401);
                    }
                    break;
                }
                
            }
        }
    public function checkToken($request){
        $jwtToken = $request->header('jwtToken');
        $secret_key = "YOUR_SECRET_KEY";
        try {
            $payload = JWT::decode($jwtToken, new Key($secret_key, 'HS256'));
            return true;
        } catch (Exception $e) {
            #echo $e->getMessage();
            return false;
        }
    }
    private function genToken($id){
        $secret_key = "YOUR_SECRET_KEY";
        $issuer_claim = "http://blog.vhost.com";
        $audience_claim = "http://blog.vhost.com";
        $issuedat_claim = time(); // issued at
        $expire_claim = $issuedat_claim + 600;
        $payload = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "exp" => $expire_claim,
            "data" => array(
                "id" => $id,
        ));
        $jwt = JWT::encode($payload, $secret_key, 'HS256');
        return $jwt;
    }
}
