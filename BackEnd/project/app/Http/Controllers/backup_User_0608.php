<?php
namespace App\Http\Controllers;
use App\Models\User as UserModel;
use Illuminate\Http\Request;

class User extends Controller{
    protected $usermodel;
    public function __construct(){
        $this->usermodel = new UserModel();
    }
    public function getAllUsers(){
        $response['result'] = $this->usermodel->showAll();
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
    public function getUser(Request $request){
        $id = $request->input("id");
        $response['result'] = $this->usermodel->showUser($id);
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
    public function newUser(Request $request){
        $id = $request->input("id");
        $name = $request->input("name");
        $role = $request->input("role");
        if($this->usermodel->addUser($id, $name, $role)==1){
            $response['status'] = 200;
            $response['message'] = '新增成功';
        }
        else{
            $response['status'] = 204;
            $response['message'] = '新增失敗';
        }
        return $response;
    }
    public function updateUser(Request $request){
        $id = $request->input("id");
        $name = $request->input("name");
        $role = $request->input("role");
        if($this->usermodel->updateUser($id, $name, $role)==1){
            $response['status'] = 200;
            $response['message'] = '更新成功';
        }
        else{
            $response['status'] = 204;
            $response['message'] = '更新失敗';
        }
        return $response;

    }
    public function removeUser(Request $request){
        $id = $request->input("id");
        if($this->usermodel->removeUser($id)==1){
            $response['status'] = 200;
            $response['message'] = '刪除成功';
        }
        else{
            $response['status'] = 204;
            $response['message'] = '刪除失敗';
        }
        return $response;

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
    public function getClasses(Request $request){
        $jwtToken = $request->header('jwtToken');
        $response['result'] = $this->usermodel->getClasses($jwtToken);
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
    public function newClass(Request $request){
        $class_name = $request->input("class_name");
        $jwtToken = $request->header('jwtToken');
        if(empty($class_name) OR empty($jwtToken)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            if($this->usermodel->newClass($class_name, $jwtToken)==1){
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
    public function getWordsetList(Request $request){
        $id = $request->input('class_id');
        if(empty($id)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            $response['result'] = $this->usermodel->getWordsetList($id);
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
    public function getWordsetContent(Request $request){
        $id = $request->input('wordset_id');
        if(empty($id)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            $response['result'] = $this->usermodel->getWordsetContent($id);
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
    public function newWordset(Request $request){
        $class_id = $request->input('class_id');
        $wordset_name = $request->input("wordset_name");
        if(empty($class_id) OR empty($wordset_name)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            if($this->usermodel->newWordset($class_id, $wordset_name)==1){
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
    public function newWord(Request $request){
        $word_english = $request->input("word_english");
        $word_chinese = $request->input("word_chinese");
        $word_meaning = $request->input("word_meaning");
        $word_pos = $request->input("word_pos");
        $wordset_id = $request->input("wordset_id");
        if(empty($word_english) OR empty($word_chinese) OR empty($word_meaning) OR empty($word_pos) OR empty($wordset_id)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            if($this->usermodel->newWord($word_english, $word_chinese, $word_meaning, $word_pos, $wordset_id)==1){
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
    public function updateWordset(Request $request){
        $wordset_id = $request->input("wordset_id");
        $wordset_name = $request->input("wordset_name");
        if(empty($wordset_id) OR empty($wordset_name)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            if($this->usermodel->updateWordset($wordset_id, $wordset_name)==1){
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
    public function updateWord(Request $request){
        $word_id = $request->input("word_id");
        $word_english = $request->input("word_english");
        $word_chinese = $request->input("word_chinese");
        $word_meaning = $request->input("word_meaning");
        $word_pos = $request->input("word_pos");
        if(empty($word_id) OR empty($word_english) OR empty($word_chinese) OR empty($word_meaning) OR empty($word_pos)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            if($this->usermodel->updateWord($word_id, $word_english, $word_chinese, $word_meaning, $word_pos)==1){
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
    public function getClassMember(Request $request){
        $class_id = $request->input('class_id');
        if(empty($class_id)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            $response['result'] = $this->usermodel->getClassMember($class_id);
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
    public function getMemberScore(Request $request){
        $class_id = $request->input('class_id');
        $user_id = $request->input('user_id');
        if(empty($class_id) OR empty($user_id)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            $response['result'] = $this->usermodel->getMemberScore($class_id, $user_id);
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
    public function addClassMember(Request $request){
        $class_id = $request->input('class_id');
        $student_id = $request->input("student_id");
        if(empty($class_id) OR empty($student_id)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            if($this->usermodel->addClassMember($class_id, $student_id)==1){
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
    public function deleteClassMember(Request $request){
        $class_id = $request->input('class_id');
        $student_id = $request->input("student_id");
        if($this->usermodel->deleteClassMember($class_id, $student_id)==1){
            $response['status'] = 200;
            $response['message'] = '刪除成功';
        }
        else{
            $response['status'] = 204;
            $response['message'] = '刪除失敗';
        }
        return $response;

    }
    public function getStudentClasses(Request $request){
        $jwtToken = $request->header('jwtToken');
        $response['result'] = $this->usermodel->getStudentClasses($jwtToken);
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
            if($this->usermodel->submitStudentScore($jwtToken, $class_id, $wordset_id, $score)==1){
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