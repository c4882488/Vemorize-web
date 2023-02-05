<?php
namespace App\Models;
use Illuminate\Support\Facades\DB;

class ClassModel{

    public function getClasses($jwtToken){
        $sql = "select class.id, class.class_name, user.user_name
                from `user`, `class`
                where `user`.id = class.class_teacher_id
                AND token =? ";
        $response = DB::select($sql,[$jwtToken]);
        return $response;
    }
    public function newClass($class_name, $jwtToken){
        $sql = "select user.id
                    from `user`
                    where token=? ";
        $result = DB::select($sql,[$jwtToken]);
        $user_id = $result[0]->id;
        $sql = "insert into class (class_name, class_teacher_id) values (:class_name, :user_id)";
        $response = DB::insert($sql, ['class_name'=>$class_name, 'user_id'=>$user_id]);
        return $response;
    }
    public function getClassMember($class_id){
        $sql = "SELECT user.id as user_id, user.user_name, class.id as class_id
                FROM `class` , user
                WHERE class.class_teacher_id = user.id
                AND class.id = ?;";
        $response["teacher"] = DB::select($sql,[$class_id]);

        $sql = "SELECT class_student.stuednt_user_id, user.user_name, class_student.stuednt_class_id
                FROM `class_student` , user
                WHERE class_student.stuednt_user_id = user.id
                AND class_student.stuednt_class_id = ?";
        $response["student"] = DB::select($sql,[$class_id]);
        return $response;
    }
    public function getClassMemberID($user_email){
        $sql = "select user.id
                from user
                where user.user_email = ?";
        $response = DB::select($sql,[$user_email]);
        return $response;
    }
    public function checkClassMemberExist($class_id, $student_id){
        $sql = "select *
                from class_student
                where class_student.stuednt_class_id = ?
                and class_student.stuednt_user_id = ?";
        $response = DB::select($sql,[$class_id, $student_id]);
        return $response;
    }
    public function addClassMember($class_id, $student_id){
        $sql = "insert into class_student (stuednt_class_id, stuednt_user_id) values (:class_id, :student_id)";
        $response = DB::insert($sql, ['class_id'=>$class_id, 'student_id'=>$student_id]);
        return $response;
    }
    public function deleteClassMember($class_id, $student_id){
        $sql = "delete from class_student where stuednt_user_id=:student_id AND stuednt_class_id=:class_id";;
        $response = DB::delete($sql, ['class_id'=>$class_id, 'student_id'=>$student_id]);
        return $response;
    }
    public function getStudentClasses($jwtToken){
        $sql = "select *
                from `user`
                where token=?";
        $result = DB::select($sql,[$jwtToken]);
        $user_id = $result[0]->id;
        $sql = "select class.id as class_id, class.class_name, user.user_name as teacher_name
                from `class_student`, `class`, `user`
                where class.class_teacher_id = user.id
                AND class_student.stuednt_class_id = class.id
                AND class_student.stuednt_user_id =?";
        $response = DB::select($sql,[$user_id]);
        return $response;
    }
}