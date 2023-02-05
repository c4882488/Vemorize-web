<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;

class EnsureRoles{
    public function handle($request, Closure $next, ...$roles){
        $token = $request->header('jwtToken');
        $sql = "select role.name 
                from user, user_role, role
                where user.id = user_role.user_id 
                and user_role.role_id = role.id
                and token=?";
        $response = DB::select($sql,[$token]);
        $role = $response[0]->name;
        $userRole = array($role);
        // echo "當前角色\n";
        // echo $role;
        // echo "\n";
        $c = count(array_intersect($roles, $userRole));
        // echo "可以執行的角色\n";
        // foreach ($roles as $r) {
        //     echo $r . ", ";
        // }
        // echo "\n";
        if($c==1){
            return $next($request);
        }
        else{
            return response('權限不足', 401);
        }
    }
}
