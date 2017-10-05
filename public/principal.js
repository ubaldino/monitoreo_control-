var socket = io.connect(document.location.href, { 'forceNew': true });

socket.on('mensajes', function(data) {
  console.log(data);
  render(data);
})

function render (data) {
  var html = data.map(function(elem, index) {
    return(`<div>
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");

  document.getElementById('mensajes').innerHTML = html;
}

