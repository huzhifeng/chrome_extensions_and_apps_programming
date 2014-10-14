console.log("Hello, Baidu Music");
var songIds = [];
var lis = $('.song-item-hook');
lis.each(function(index, element) {
  var obj = jQuery.parseJSON($(element).attr('data-songitem'));
  var sid = obj.songItem.sid;
  songIds.push(sid);
});

var url = 'http://play.baidu.com/data/music/songlink?songIds=' + songIds.join(',');
$.getJSON(url, function(json) {
  var songList = json.data.songList;
  lis.each(function(index, element) {
    var songLink = songList[index].songLink;
    if (!songLink) {
      return;
    }
    var end = songLink.indexOf('&src=');
    if (end !== -1) {
      console.log('cut share link: ' + songLink);
      songLink = songLink.slice(0, end);
    }
    $(element).find('a.icon-download, a.icon-download-disabled').replaceWith('<a style="color:green;" target="_blank" href="' + songLink + '">下载</a>');
  });
});