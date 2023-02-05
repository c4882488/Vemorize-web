<?php
namespace App\Http\Controllers;
use App\Models\User as UserModel;
use Illuminate\Http\Request;

class User extends Controller{
    protected $usermodel;
    public function __construct(){
        $this->usermodel = new UserModel();
    }
    public function getProfile(Request $request){
        $jwtToken = $request->header('jwtToken');
        $response['result'] = $this->usermodel->getProfile($jwtToken);
        if(count($response['result'])!=0){
            $response['status'] = 200;
            $response['message'] = '查詢成功';
        }
        else{
            $response['status'] = 204;
            $response['message'] = '無查詢結果';
        }
        return $response;

    }
    public function updateProfile(Request $request){
        $name = $request->input("name");
        $email = $request->input("email");
        $birthday = $request->input("birthday");
        $jwtToken = $request->header('jwtToken');
        if(empty($name) OR empty($email) OR empty($birthday) OR empty($jwtToken)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            if($this->usermodel->updateProfile($name, $email, $birthday, $jwtToken)==1){
                $response['status'] = 200;
                $response['message'] = '更新成功';
            }
            else{
                $response['status'] = 204;
                $response['message'] = '更新失敗';
            }
            return $response;
        }
    }
}