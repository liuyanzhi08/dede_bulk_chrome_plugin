require(['config'], function () {
  requirejs(['jquery'], function ($) {
    //var dropInput = document.querySelector('#drop-input')
    var fileInput = document.querySelector(('#file-input'))

    fileInput.addEventListener('change', function (e) {
      var file = fileInput.files[0]
      readmultifiles([file])
    })

    //dropInput.addEventListener("dragover", function(e) {
    //  e.stopPropagation();
    //  e.preventDefault();
    //}, false);
    //
    //dropInput.addEventListener('drop', function(e) {
    //  e.stopPropagation();
    //  e.preventDefault();
    //  var files = e.target.files || e.dataTransfer.files;
    //  readmultifiles(files)
    //}, false);

    function readmultifiles(files) {
      var reader = new FileReader();

      function readFile(index) {
        if( index >= files.length ) return;

        var file = files[index];
        reader.onload = function(e) {
          // get file content
          //console.log(reader.result)
          addArc(reader.result)
          // do sth with bin

          readFile(index+1)
        }
        reader.readAsText(file);
      }
      readFile(0);
    }

    function addArc (file) {
      chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, {
          file: file
        }, function (res) {
          //alert(res)
        })
      })
    }
  })
})