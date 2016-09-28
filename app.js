const app = {
  start: function(){
    $('img').on('click', (e) => {
      const path = e.target.src.split('/')
      const file = path.pop()
      const dir = path.pop()
      const fileName = `${dir}/${file}`
      this.changeHash('image/'+fileName)
    })
    $(document).on('scroll', (e) => {
      $('.pictures').each(function() {
        if ($(this).offset().top < window.pageYOffset + 10
            && $(this).offset().top + $(this).height() > window.pageYOffset + 10
        ) {
          window.location.hash = 'home/'+$(this).attr('id');
        }
      })
    })
    window.addEventListener('hashchange', (e) => {
      e.preventDefault()
      const hash = getHashFromURL(e.newURL)
      if(/home/.test(hash)){
        showBlog()
        hideImage()
        if(hash.split('/').length > 1){
          const id = hash.split('/')[1]
          const el = $('#'+id)
          const top = el.offset().top
          window.scrollTo(0, top)
        }
      } else if(/image/.test(hash)){
        hideBlog()
        showImage()
        const path = makeImagePathFromHash(hash)
        $('.img-display').attr('src', path)
      }
    })

    this.changeHash('home')
  },
  changeHash: function(val){
    window.location.hash = val
  }
}

function makeImagePathFromHash(hash){
  const image = hash.split('/')
  image.shift()
  const path = image.join('/')
  return 'img/'+path
}

function getHashFromURL(url){
  const path = url.split('#')
  if(!path.length){
    window.location.hash = 'home'
  } else {
    return path[1]
  }
}

function hideBlog(){
  $('.story').addClass('hidden')
}

function showBlog(){
  $('.story').removeClass('hidden')
}

function showImage(){
  $('.image').removeClass('hidden')
}

function hideImage(){
  $('.image').addClass('hidden')
}

// $('img').on('click', (e) => {
//   const path = e.target.src.split('/')
//   const fileName = `${path[path.length-2]}/${path[path.length-1]}`
//   document.write('<img height="768" width="1024" src="img/'+fileName+'">')
// })
