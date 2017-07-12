jQuery(function() {
	setTimeout(function(){
		jQuery('[data-mbs-uid] .notice-dismiss').on('click',function(){
			var $t = jQuery(this), $p = $t.parents('div.is-dismissible').first();
			if ($p.data('mbs-uid') != '') {
				jQuery.getJSON(
					ajaxurl,
					{action:'mb_spirit_dismiss_notice',uid:$p.data('mbs-uid')}
				);
			}
		});
	},1000);
});


function mb_spirit_button(t) {
	var editor = jQuery(t).data('editor'), $textarea = jQuery('#'+editor);
	mb_spirit_show_shortcodes(t,$textarea);
	return false;
}

var scinfo = {};
function mb_spirit_show_shortcodes(etgt,editor) {
	scinfo = {
		btn: jQuery(etgt)
		,ed: jQuery(editor)
		,textarea: jQuery(editor)
	};
	scinfo.p = scinfo.textarea.parents('.wp-editor-wrap').first();
	scinfo.tinyactive = scinfo.p.hasClass('tmce-active');
	scinfo.store_value = typeof scinfo.btn.data('store_value') == 'undefined' ? null : scinfo.btn.data('store_value');
	scinfo.store_desc = typeof scinfo.btn.data('store_desc') == 'undefined' ? null : scinfo.btn.data('store_desc');
	scinfo.widget_type = typeof scinfo.btn.data('type') == 'undefined' ? '' : scinfo.btn.data('type');
	jQuery.getJSON(
		ajaxurl,
		{action:'mb_spirit_api_proxy',endpoint:'wp_shortcode_builder',tb:1,widget:scinfo.widget_type},
		function(res) {
			jQuery('#mb-spirit-shortcodes').html(res.wp_html);
		}
	);
}

