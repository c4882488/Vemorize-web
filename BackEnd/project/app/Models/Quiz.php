<?php
namespace App\Models;
use Illuminate\Support\Facades\DB;

class Quiz{
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
}