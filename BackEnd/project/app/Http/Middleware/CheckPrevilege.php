<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Support\Facades\DB;

class CheckPrevilege{
    public function handle($request, Closure $next){  
        $token = $request->header('role');
        $sql = "select * 
                from user, user_role, role
                where user.id = user_role.user_id 
                and user_role.role_id = role.id
                and token=?";
        $response = DB::select($sql,[$token]);
        print_r($response);
        $role = $request->header('role');
        $isAuthorized = ($role=="admin") ? true : false;
        if($isAuthorized){
            return $next($request);
        }
        else{
            return response('權限不足', 401);
        }
    }
}
