<?php
set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');
require 'Net/SSH2.php';
require 'MainFunction.php';
$ssh = new Net_SSH2('47.89.42.250');
if (!$ssh->login('root', 'Gundam12')) {
   exit('Login Failed');
}
$json = $ssh->exec('curl -s http://baobab.wandoujia.com/api/v1/feed?num=5');
$API = json_decode($json);
function get_second_to_his($s){
   return str_pad(floor((($s%86400)%3600)/60),2,'0',STR_PAD_LEFT)."' ".str_pad(floor((($s%86400)%3600)%60),2,'0',STR_PAD_LEFT).'"';
}
?>
<document>
<head>
  <style>
  .tags {
    font-size: 16;
    background-color: rgba(0,0,0,0.1);
  }
  </style>
</head>

<listTemplate>
   <list>
      <header>
         <title>每日開眼</title>
      </header>
      <section>
         <?php
         foreach ($API->dailyList as $dailyList) {
            // echo $dailyList->date;
            // echo "</br>";
            // echo $dailyList->total;
            foreach ($dailyList->videoList as $video) {
               $playurl = $video->playUrl;
               ?>
               <listItemLockup videoURL="<?=$playurl?>" videoTITLE="<?=$video->title?>" description="<?=$video->description?>" artworkImageURL="<?=$video->coverForDetail;?>">
                  <title><?=$video->title?></title>
                  <subtitle>#<?=$video->tags[0]->name?></subtitle>
                  <decorationLabel><? echo get_second_to_his($video->duration); ?></decorationLabel>
                  <relatedContent>
                     <lockup>
                        <img width="857" src='<?=$video->coverForDetail;?>'/>
                        <title><?=$video->title?></title>
                        <text>
                        <?php
                        foreach ($video->tags as $t) {
                           echo "<span class='tags'>#".$t->name.'</span>　';
                        }
                        ?>
                        </text>
                        <description><?=$video->description?></description>
                     </lockup>
                  </relatedContent>
               </listItemLockup>
               <?php
            }
         }
         ?>
      </section>
   </list>
</listTemplate>
</document>
