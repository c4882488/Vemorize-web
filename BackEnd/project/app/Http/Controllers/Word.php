<?php
namespace App\Http\Controllers;
use App\Models\Word as WordModel;
use Illuminate\Http\Request;

class Word extends Controller{
    protected $wordmodel;
    public function __construct(){
        $this->wordmodel = new WordModel();
    }
    public function getWordsetList(Request $request){
        $id = $request->input('class_id');
        if(empty($id)){
            $response['status'] = 400;
            $response['message'] = '缺少必填欄位';
            return $response;
        }
        else{
            $response['result'] = $this->wordmodel->getWordsetList($id);
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
            $response['result'] = $this->wordmodel->getWordsetContent($id);
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
            if($this->wordmodel->newWordset($class_id, $wordset_name)==1){
                $response["result"]= $this->wordmodel->getWordsetID();
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
            if($this->wordmodel->updateWordset($wordset_id, $wordset_name)==1){
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
    // public function updateWord(Request $request){
    //     $word_id = $request->input("word_id");
    //     $word_english = $request->input("word_english");
    //     $word_chinese = $request->input("word_chinese");
    //     $word_meaning = $request->input("word_meaning");
    //     $word_pos = $request->input("word_pos");
    //     if(empty($word_id) OR empty($word_english) OR empty($word_chinese) OR empty($word_meaning) OR empty($word_pos)){
    //         $response['status'] = 400;
    //         $response['message'] = '缺少必填欄位';
    //         return $response;
    //     }
    //     else{
    //         if($this->wordmodel->updateWord($word_id, $word_english, $word_chinese, $word_meaning, $word_pos)==1){
    //             $response['status'] = 200;
    //             $response['message'] = '更新成功';
    //         }
    //         else{
    //             $response['status'] = 204;
    //             $response['message'] = '更新失敗';
    //         }
    //         return $response;
    //     }
    // }
    public function updateWordsetContent(Request $request){
        $words = $request->all();
        $wordset_id = $request->input("wordset_id");
        $delete_old = $this->wordmodel->deleteOldContent($wordset_id);
        $fail = 0;
        $fail_list = array();
        for ( $i=0 ; $i < count($words["words"]) ; $i++ ) {
            if(count($words["words"][$i])<4){
                $fail += 1;
                array_push($fail_list, $word_english);
            }
            else{
                $word_english = $words["words"][$i]["word_english"];
                $word_chinese = $words["words"][$i]["word_chinese"];
                $word_meaning = $words["words"][$i]["word_meaning"];
                $word_pos = $words["words"][$i]["word_pos"];
                if(empty($word_english) OR empty($word_chinese) OR empty($word_meaning) OR empty($word_pos) OR empty($wordset_id)){
                    //$response['status'] = 400;
                    //$response['message'] = '缺少必填欄位';
                    $fail += 1;
                    array_push($fail_list, $word_english);
                }
                else{
                    if($this->wordmodel->newWord($word_english, $word_chinese, $word_meaning, $word_pos, $wordset_id)==1){
                        $response['status'] = 200;
                        $response['message'] = '新增成功';
                    }
                    else{
                        $fail += 1;
                        array_push($fail_list, $word_english);
                    }
                };    
            }
        }
        $response['status'] = 200;
        $response['message'] = '新增成功';
        $response["result"]["fail"] = $fail;
        $response["result"]["fail_list"] = $fail_list;
        return $response;
    }
}