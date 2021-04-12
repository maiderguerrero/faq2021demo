(function (blink) {
	'use strict';

	var faquxdemo2Style = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	faquxdemo2Style.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_faquxdemo2',

		toolbar: { name: 'editorial', items: ['Blink_faquxdemo2_link'] },

		extraPlugins: ['image2', 'blink_faquxdemo2_link'],

		ckEditorStyles: {
			name: 'faquxdemo2',
			styles: [
				{ name: 'Encabezado', element: 'h4', attributes: { 'class': 'bck-encabezado' } },
				{ name: 'Sub-Encabezado', element: 'p', attributes: { 'class': 'bck-sub-encabezado' } },

				{ name: 'Tabla centrada', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table-center'} }
			]
		},

		init: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(this);
			this.addActivityTitle();
			this.suscribeToBlinkEvents();
		},

		suscribeToBlinkEvents: function () {
			blink.events.on('initSlides:after', function () {
				if (!checkModoCorreccion()) {
					$('.revision-budget').add('.modo_revision')
						.hideBlink();
				}
			});
		},

		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html() + ' > ' + blink.courseInfo.unit;
			})
		},

		configEditor: function (editor) {
			editor.dtd.$editable['span'] = 1;
		},

		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	faquxdemo2Style.prototype = _.extend({}, new blink.theme.styles.basic(), faquxdemo2Style.prototype);

	blink.theme.styles.faquxdemo2 = faquxdemo2Style;

})( blink );

$(function () {
	if (blink.activity) {
		blink.activity.getContainerWidth = function () {
			return $('.swipeview-active').find('.item-container').find('.layout').width();
		};
	}
});
