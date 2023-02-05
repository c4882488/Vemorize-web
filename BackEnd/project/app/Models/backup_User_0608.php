<?php
namespace App\Models;
use Illuminate\Support\Facades\DB;

class User{
    public function showAll(){
        $sql = "select * from test";
        $response = DB::select($sql);
        return $response;
    }
    public function showUser($id){
        $sql = "select * from test where id=?";
        $response = DB::select($sql,[$id]);
        return $response;
    }
    public function addUser($id, $name, $role){
        $sql = "insert into test (id, name, role) values (:id, :name, :role)";
        $response = DB::insert($sql, ['id'=>$id, 'name'=>$name, 'role'=>$role]);
        return $response;
    }
    public function updateUser($id, $name, $role){
        $sql = "update test set name=:name, role=:role where id=:id";
        $response = DB::update($sql, ['id'=>$id, 'name'=>$name, 'role'=>$role]);
        return $response;
    }
    public function removeUser($id){
        $sql = "delete from test where id=:id";
        $response = DB::delete($sql, ['id'=>$id]);
        return $response;
    }
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
        print_r($user_id);
        $sql = "insert into class (class_name, class_teacher_id) values (:class_name, :user_id)";
        $response = DB::insert($sql, ['class_name'=>$class_name, 'user_id'=>$user_id]);
        return $response;
    }
    public function getWordsetList($id){
        $sql = "select wordset.id as wordset_id, wordset.wordset_name
                from `wordset`, class
                where class.id = wordset.class_id
                and class.id = ?";
        $response = DB::select($sql,[$id]);
        return $response;
    }
    public function getWordsetContent($id){
        $sql = "select word.id, word.word_english, word.word_chinese, word.word_meaning, word.word_pos
                from `wordset`, word
                where wordset.id = word.wordset_id
                and wordset.id = ?";
        $response = DB::select($sql,[$id]);
        return $response;
    }
    public function newWordset($class_id, $wordset_name){
        $sql = "insert into wordset (class_id, wordset_name) values (:class_id, :wordset_name)";
        $response = DB::insert($sql, ['class_id'=>$class_id, 'wordset_name'=>$wordset_name]);
        return $response;
    }
    public function newWord($word_english, $word_chinese, $word_meaning, $word_pos, $wordset_id){
        $sql = "insert into word (word_english, word_chinese, word_meaning, word_pos, wordset_id) values (:word_english, :word_chinese, :word_meaning, :word_pos, :wordset_id);";
        $response = DB::insert($sql, ['word_english'=>$word_english, 'word_chinese'=>$word_chinese, 'word_meaning'=>$word_meaning, 'word_pos'=>$word_pos, 'wordset_id'=>$wordset_id]);
        return $response;
    }
    public function updateWordset($wordset_id, $wordset_name){
        $sql = "update wordset set wordset_name=:wordset_name where id=:wordset_id";
        $response = DB::update($sql, ['wordset_name'=>$wordset_name, 'wordset_id'=>$wordset_id]);
        return $response;
    }
    public function updateWord($word_id, $word_english, $word_chinese, $word_meaning, $word_pos){
        $sql = "update word set word_english=:word_english, word_chinese=:word_chinese, word_meaning=:word_meaning, word_pos=:word_pos where id=:word_id";
        $response = DB::update($sql, ['word_english'=>$word_english, 'word_chinese'=>$word_chinese, 'word_meaning'=>$word_meaning, 'word_pos'=>$word_pos, 'word_id'=>$word_id]);
        return $response;
    }
    public function getClassMember($class_id){
        $sql = "SELECT user.id as user_id, user.user_name, class.id as class_id
                FROM `class` , user
                WHERE class.class_teacher_id = user.id
                AND class.id = ?;";
        $response["teacher"] = DB::select($sql,[$class_id]);

        $sql = "SELECT class_student.id, user.user_name, class_student.stuednt_class_id
                FROM `class_student` , user
                WHERE class_student.stuednt_user_id = user.id
                AND class_student.stuednt_class_id = ?";
        $response["student"] = DB::select($sql,[$class_id]);
        return $response;
    }
    public function getMemberScore($class_id, $user_id){
        $sql = "SELECT quiz.id, user.user_name, wordset.wordset_name, quiz.quiz_score
                FROM quiz, user, wordset
                WHERE quiz_wordset_id = wordset.id
                AND quiz.quiz_user_id = user.id
                AND quiz.quiz_class_id = ?
                AND quiz.quiz_user_id = ?";
        $response = DB::select($sql,[$class_id, $user_id]);
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
        $sql = "select class.class_name, user.user_name as teacher_name
                from `class_student`, `class`, `user`
                where class.class_teacher_id = user.id
                AND class_student.stuednt_class_id = class.id
                AND class_student.stuednt_user_id =?";
        $response = DB::select($sql,[$user_id]);
        return $response;
    }
    public function submitStudentScore($jwtToken, $class_id, $wordset_id, $score){
        $sql = "select *
                from `user`
                where token=?";
        $result = DB::select($sql,[$jwtToken]);
        $user_id = $result[0]->id;
        $sql = "insert into quiz ( quiz_user_id, quiz_class_id, quiz_wordset_id, quiz_score) values (:user_id, :class_id, :wordset_id, :score)";
        $response = DB::insert($sql, ['user_id'=>$user_id, 'class_id'=>$class_id, 'wordset_id'=>$wordset_id, 'score'=>$score]);
        return $response;
    }
    public function checkEmail($email){
        $sql = "SELECT user.id
                FROM user
                WHERE user.user_email = ?";
        $response = DB::select($sql,[$email]);
        return $response;
    }
}