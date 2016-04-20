<br><br><br>
ZOOM=<label id="valorZoom"></label>
<br><br>
<span id="disminuir" class="glyph-icon flaticon-signs-1 icon-zoom"></span>
<span id="aumentar" class="glyph-icon flaticon-next icon-zoom"></span>


<script>
$('#valorZoom').text($('#contenedor').css("zoom"));

$('#aumentar').click(function(){
	var valor = parseInt($('#valorZoom').text())+0.1;
	
	$('#contenedor').css('zoom', valor);
	$('#valorZoom').text(valor);
	
});
</script>