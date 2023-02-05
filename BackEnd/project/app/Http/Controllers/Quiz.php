<?php
namespace App\Http\Controllers;
use App\Models\Quiz as QuizModel;
use Illuminate\Http\Request;

class Quiz extends Controller{
    protected $quizmodel;
    public function __construct(){
        $this->quizmodel = new QuizModel();
    }

    public function getMemberScore(Request $request){
        $class_id = $request->input('class_id');
        $user_id = $request->input('user_id');
        if(empty($class_id) OR empty($user_id)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            $response['result'] = $this->quizmodel->getMemberScore($class_id, $user_id);
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
        

    }
    public function submitStudentScore(Request $request){
        $jwtToken = $request->header('jwtToken');
        $class_id = $request->input('class_id');
        $wordset_id = $request->input('wordset_id');
        $score = $request->input("score");
        if(empty($jwtToken) OR empty($class_id) OR empty($wordset_id) OR empty($score)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            if($this->quizmodel->submitStudentScore($jwtToken, $class_id, $wordset_id, $score)==1){
                $response['status'] = 200;
                $response['message'] = '新增成功';
            }
            else{
                $response['status'] = 204;
                $response['message'] = '新增失敗';
            }
            return $response;
        };
    }
}