document.getElementById('button-baidu').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  open("https://www.baidu.com/s?wd="+keywords);
}//百度

document.getElementById('button-google').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="https://www.google.com.hk/";
  else
    open("https://www.google.com.hk/search?q="+keywords);
}//谷歌

document.getElementById('button-bing').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="https://cn.bing.com";
  else
    open("https://cn.bing.com/search?q="+keywords);
}//bing

document.getElementById('button-weixin').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  open("http://weixin.sogou.com/weixin?type=2&query="+keywords);
}//微信

document.getElementById('button-wikicn').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="https://en.wikipedia.org/wiki/Main_Page";
  else
    open("https://en.wikipedia.org/wiki/"+keywords);
}//维基百科

document.getElementById('button-bilibili').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="http://www.bilibili.com/";
  else
  open("http://search.bilibili.com/all?keyword="+keywords);
}//bilibili

document.getElementById('button-zhihu').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="https://www.zhihu.com/";
  else
    open("https://www.zhihu.com/search?type=content&q="+keywords);
}//知乎

document.getElementById('button-weibo').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="http://weibo.com";
  else
    open("http://s.weibo.com/weibo/"+keywords);
}//微博

document.getElementById('button-tieba').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="https://tieba.baidu.com/index.html";
  else
  open("http://tieba.baidu.com/f/search/res?ie=utf-8&qw="+keywords);
}//贴吧

document.getElementById('button-douban').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="https://www.douban.com/";
  else
  open("https://www.douban.com/search?cat=1002&q="+keywords);
}//豆瓣

document.getElementById('button-baiduyun').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="http://pan.baidu.com/disk/home";
  else
  open("http://www.xilinjie.com/s?q="+keywords);
}//百度云

document.getElementById('button-github').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="https://github.com/";
  else
  open("https://github.com/search?utf8=✓&q="+keywords);
}//Github

document.getElementById('button-tencenttv').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="https://v.qq.com/";
  else
  open("https://v.qq.com/x/search/?q="+keywords);
}//腾讯视频

document.getElementById('button-youku').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="http://www.youku.com/";
  else
  open("http://www.soku.com/search_video/q_"+keywords);
}//优酷视频

document.getElementById('button-youtube').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="https://www.youtube.com/";
  else
  open("https://www.youtube.com/results?search_query="+keywords);
}//youtube

document.getElementById('button-ustctv').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  location.href="http://tv6.ustc.edu.cn/";
}//中科大电视

document.getElementById('button-byrbt').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="http://bt.byr.cn/index.php";
  else
  open("http://bt.byr.cn/torrents.php?search="+keywords);
}//北邮人

document.getElementById('button-whubt').onclick=function(){
  var keywords=encodeURI(document.getElementById('text').value);
  if(keywords=='')
    location.href="https://pt.whu.edu.cn/";
  else
  open("https://pt.whu.edu.cn/torrents.php?search="+keywords);
}//珞樱







//  //北邮人
//   $('#button-byrbt').bind('click',function(){
//     var keywords=encodeURI($('#text').val());
//     if(keywords=='')
//       location.href="http://bt.byr.cn/index.php";
//     else
//     open("http://bt.byr.cn/torrents.php?search="+keywords);
//   })
//
//  //珞樱
//   $('#button-whubt').bind('click',function(){
//     var keywords=encodeURI($('#text').val());
//     if(keywords=='')
//       location.href="https://pt.whu.edu.cn/";
//     else
//     open("https://pt.whu.edu.cn/torrents.php?search="+keywords);
//   })
//
//  //蝴蝶
//   $('#button-hudbt').bind('click',function(){
//     var keywords=encodeURI($('#text').val());
//     if(keywords=='')
//       location.href="https://hudbt.hust.edu.cn/index.php";
//     else
//     open("https://hudbt.hust.edu.cn/torrents.php?search="+keywords);
//   })
//
//  //蒲公英
//   $('#button-npupt').bind('click',function(){
//     var keywords=encodeURI($('#text').val());
//     if(keywords=='')
//       location.href="http://npupt.com/";
//     else
//     open("http://npupt.com/torrents.php?search="+keywords);
//   })
//

//  //iconfont
//   $('#button-iconfont').bind('click',function(){
//     var keywords=encodeURI($('#text').val());
//     if(keywords=='')
//       location.href="http://www.iconfont.cn/plus/home/index";
//     else
//     open("http://www.iconfont.cn/plus/search/index?searchType=icon&q="+keywords);
//   })
//
//  //知网
//   $('#button-cnki').bind('click',function(){
//     var keywords=encodeURI($('#text').val());
//     if(keywords=='')
//       location.href="http://www.cnki.net/";
//     else
//     open("http://search.cnki.com.cn/search.aspx?q="+keywords);
//   })
//
//  //nippon
//   $('#button-nippon').bind('click',function(){
//       location.href="http://nipponcolors.com/";
//   })
//

var stu =document.getElementById('stu')
var stutitle=document.getElementById('showstu')
var stumain=document.getElementById('liststu')

stutitle.onmouseover=function(e){
  console.log(e);
  stumain.style.display="block";
  console.log(stu.style.height);
  stumain.style.left=e.clientX-50;
  stumain.style.top=e.clientY-stu.offsetHeight+20;

}

stutitle.onmouseout=function(){
  stumain.style.display="none";
}

stumain.onmouseover=function(){
  stumain.style.display="block";
}

stumain.onmouseout=function(){
  stumain.style.display="none";
}

document.getElementById('text').focus()
