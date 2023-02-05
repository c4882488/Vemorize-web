<?php
namespace App\Http\Controllers;
use App\Models\ClassModel as ClassModel;
use Illuminate\Http\Request;

class ClassController extends Controller{
    protected $classmodel;
    public function __construct(){
        $this->classmodel = new ClassModel();
    }
    
    public function getClasses(Request $request){
        $jwtToken = $request->header('jwtToken');
        $response['result'] = $this->classmodel->getClasses($jwtToken);
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
            if($this->classmodel->newClass($class_name, $jwtToken)==1){
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
    public function getClassMember(Request $request){
        $class_id = $request->input('class_id');
        if(empty($class_id)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            $response['result'] = $this->classmodel->getClassMember($class_id);
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
        $user_email = $request->input("user_email");
        if(empty($class_id) OR empty($user_email)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            $ID_response = $this->classmodel->getClassMemberID($user_email);
            $student_id = $ID_response[0]->id;
            $check['result'] = $this->classmodel->checkClassMemberExist($class_id, $student_id);
            if(count($check['result'])!=0){
                $response['status'] = 409;
                $response['message'] = '成員已存在';
                return $response; 
            }
            else{
                if($this->classmodel->addClassMember($class_id, $student_id)==1){
                    $response['status'] = 200;
                    $response['message'] = '新增成功';
                }
                else{
                    $response['status'] = 204;
                    $response['message'] = '新增失敗';
                }
                return $response;    
            }
            
        };
    }
    public function deleteClassMember(Request $request){
        $class_id = $request->input('class_id');
        $student_id = $request->input("student_id");
        if(empty($class_id) OR empty($student_id)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            if($this->classmodel->deleteClassMember($class_id, $student_id)==1){
                $response['status'] = 200;
                $response['message'] = '刪除成功';
            }
            else{
                $response['status'] = 204;
                $response['message'] = '刪除失敗';
            }
            return $response;
        }

    }
    public function getStudentClasses(Request $request){
        $jwtToken = $request->header('jwtToken');
        $response['result'] = $this->classmodel->getStudentClasses($jwtToken);
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