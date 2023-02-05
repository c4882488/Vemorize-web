<?php
namespace App\Models;
use Illuminate\Support\Facades\DB;

class User{
    public function getProfile($jwtToken){
        $sql = "select user.id, user_name, user_email, user_birthday , role.name
                from `user`, `user_role`, `role`
                where `user`.id = user_role.user_id
                AND user_role.role_id = role.id
                AND token =? ";
        $response = DB::select($sql,[$jwtToken]);
        return $response;
    }
    public function updateProfile($name, $email, $birthday, $jwtToken){
        $sql = "update user set user_name=:name, user_email=:email, user_birthday=:birthday where token=:jwtToken";
        $response = DB::update($sql, ['name'=>$name, 'email'=>$email, 'birthday'=>$birthday, 'jwtToken'=>$jwtToken]);
        return $response;
    }
    public function checkEmail($email){
        $sql = "SELECT user.id
                FROM user
                WHERE user.user_email = ?";
        $response = DB::select($sql,[$email]);
        return $response;
    }
    public function checkLogin($email, $password){
        $sql = "select * from user where user_email=? and user_password=?";
        $response = DB::select($sql,[$email, $password]);
        return $response;
    }
    public function updateToken($email, $token){
        $sql = "update user set token=:token where user_email=:email";
        $response = DB::update($sql, ['email'=>$email, 'token'=>$token]);
        return $response;
    }
}