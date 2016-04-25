chrome.extension.onRequest.addListener(function (req) {
  if (req.file) {
    var arcs = JSON.parse(req.file)
    AddArcs(arcs)
  }
})

function AddArcs (arcs) {
  addArc(0)
  function addArc (i) {
    var arc = arcs[i]
    if (i >= arc.length) {
      return
    }
    goToAddArcPage(arc, function () {
      fillArcForm(arc)
      createArc()
      detectArcCreated(function () {
        addArc(i + 1)
      })
    })
  }
}

function goToAddArcPage (arc, cb) {
  var doc = $('#menufra').contents()
  $('.flrct a', doc)[2].click()
  $('#main').on('load', fillArcFormWrapper)
  function fillArcFormWrapper (e) {
    cb && cb()
    $('#main').off('load', fillArcFormWrapper)
  }
}

function fillArcForm (arc) {
  var doc = $('#main').contents()
  var titleInput = $('#title', doc)
  var contentInput = $('textarea[name=body]', doc)
  var typeInput = $('#typeid', doc)
  titleInput.val(arc.title)
  contentInput.val(arc.content)
  typeInput.val(arc.typeId)
}

function createArc (cb) {
  var doc = $('#main').contents()
  $('[name=imageField]', doc).click()
  detectArcCreated(cb)
}

function detectArcCreated (cb) {
  var doc = $('#main').contents()
  var html = $('body', doc).html()
  if (html && html.indexOf('继续发布文章') !== -1) {
    cb && cb()
  } else {
    setTimeout(function () {
      detectArcCreated(cb)
    })
  }
}