<?php
namespace App\Models;
use Illuminate\Support\Facades\DB;

class Word{
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
        $sql = "insert into wordset (class_id, wordset_name) values (:class_id, :wordset_name);";
        $response = DB::insert($sql, ['class_id'=>$class_id, 'wordset_name'=>$wordset_name]);
        return $response;
    }
    public function getWordsetID(){
        $sql = "SELECT LAST_INSERT_ID() as wordset_id;";
        $response = DB::select($sql);
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
    // public function updateWord($word_id, $word_english, $word_chinese, $word_meaning, $word_pos){
    //     $sql = "update word set word_english=:word_english, word_chinese=:word_chinese, word_meaning=:word_meaning, word_pos=:word_pos where id=:word_id";
    //     $response = DB::update($sql, ['word_english'=>$word_english, 'word_chinese'=>$word_chinese, 'word_meaning'=>$word_meaning, 'word_pos'=>$word_pos, 'word_id'=>$word_id]);
    //     return $response;
    // }
    public function deleteOldContent($wordset_id){
        $sql = "delete from word where wordset_id=:wordset_id ";;
        $response = DB::delete($sql, ['wordset_id'=>$wordset_id]);
        return $response;
    }
}