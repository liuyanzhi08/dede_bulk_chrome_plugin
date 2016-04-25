chrome.extension.onRequest.addListener(function (req, sender, res) {
  if (req.file) {
    var arcs = JSON.parse(req.file)
    arcs.forEach(function (arc, index) {
      //console.log(arc, index)
      if (index > 0) {
        return
      }

      addArc(arc)
    })
  }
})

function addArc (arc) {
  goToAddArcPage(arc)
}

function goToAddArcPage (arc) {
  var doc = $('#menufra').contents()
  $('.flrct a', doc)[2].click()
  $('#main').on('load', fillArcFormWrapper)
  function fillArcFormWrapper (e) {
    fillArcForm(arc)
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