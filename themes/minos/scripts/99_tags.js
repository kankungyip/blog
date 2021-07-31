/**
 * Colored quote block
 */
hexo.extend.tag.register('colorquote', function (args, content) {
    var type =  args[0];
    return '<blockquote class="colorquote ' + type + '">' + hexo.render.renderSync({text: content, engine: 'markdown'}) + '</blockquote>';
}, {ends: true});

const rEscapeContent = /<escape(?:[^>]*)>([\s\S]*?)<\/escape>/g;
const placeholder = '\uFFFD';
const rPlaceholder = /(?:<|&lt;)\!--\uFFFD(\d+)--(?:>|&gt;)/g;
const cache = [];
function escapeContent(str) {
  return '<!--' + placeholder + (cache.push(str) - 1) + '-->';
}
hexo.extend.filter.register('before_post_render', function(data) {
  data.content = data.content.replace(rEscapeContent, function(match, content) {
    return escapeContent(content);
  });
  return data;
});

hexo.extend.filter.register('after_post_render', function(data) {
  data.content = data.content.replace(rPlaceholder, function() {
    return cache[arguments[1]];
  });
  return data;
});

/**
 * Gallery
 */
hexo.extend.tag.register('gallery', function (args, content) {
  var content_html = hexo.render.renderSync({text: content, engine: 'markdown'});
  content_html = content_html.replace('<p>', '').replace('<br>', '').replace('</p>', '');
  return '<div style="margin-top:1em;margin-bottom:1em;" class="justified-gallery">' + content_html + '</div>';
}, {ends: true});

/**
 * micro:bit
 */
hexo.extend.tag.register('microbit', function (args) {
  var code_id = args[0];
  var base_url = 'https://makecode.microbit.org/';
  if (args[1] == 'run') {
    return '<div style="position:relative;margin-top:1em;margin-bottom:1em;height:0;padding-bottom:81.97%;overflow:hidden;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="' + base_url + '---run?id=' + code_id + '" allowfullscreen sandbox="allow-popups allow-forms allow-scripts allow-same-origin" frameborder="0"></iframe></div>';
  }
  var height = args[1] || 400;
  return '<div style="position:relative;margin-top:1em;margin-bottom:1em;height:calc(' + height + 'px + 5em);width:100%;overflow:hidden;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="' + base_url + '---codeembed#pub:' + code_id + '" allowfullscreen frameborder="0" sandbox="allow-scripts allow-same-origin"></iframe></div>';
});

/**
 * Videos
 * Youku: <iframe height=498 width=510 src='https://player.youku.com/embed/XMjY5OTEyNDg1Ng==' frameborder=0 'allowfullscreen'></iframe>
 */
function getEmbedVideo(tag, id) {
  var url = '';
  switch (tag) {
    case 'youku':
      url = '//player.youku.com/embed/' + id + '==';
      break;
  }
  return '<div style="position:relative;padding-top:56.25%;margin-top:1em;margin-bottom:1em;height:0;overflow:hidden;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;margin-top:0;" src="' + url + '" frameborder=0 allowfullscreen></iframe></div>'

}
hexo.extend.tag.register('youku', function (args) {
  return getEmbedVideo('youku', args[0]);
});
