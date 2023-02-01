var lang = '';

$(document).ready(function() {
	i18next.use(window.i18nextBrowserLanguageDetector).use(window.i18nextXHRBackend).init({
		fallbackLng: 'en',
		backend: {
			loadPath: 'lang/{{lng}}.json'
		}
	}, function() {
		lang = i18next.t('language');
		document.getElementById('home_title').innerHTML = i18next.t('home_title');
		document.getElementById('education_title').innerHTML = i18next.t('education_title');
		document.getElementById('experience_title').innerHTML = i18next.t('experience_title');
		document.getElementById('skills_title').innerHTML = i18next.t('skills_title');
		document.getElementById('portfolio_title').innerHTML = i18next.t('portfolio_title');
		document.getElementById('contact_title').innerHTML = i18next.t('contact_title');
		document.getElementById('home_text').innerHTML = i18next.t('home_text');
		document.getElementById('education_text').innerHTML = i18next.t('education_text');
		document.getElementById('experience_text').innerHTML = i18next.t('experience_text');
		document.getElementById('skills_text').innerHTML = i18next.t('skills_text');
		document.getElementById('portfolio_text').innerHTML = i18next.t('portfolio_text');
		document.getElementById('portfolio_button').innerHTML = i18next.t('portfolio_button');
		document.getElementById('contact_text').innerHTML = i18next.t('contact_text');
		document.getElementById('contact_name').innerHTML = i18next.t('contact_name');
		document.getElementById('contact_email').innerHTML = i18next.t('contact_email');
		document.getElementById('contact_message').innerHTML = i18next.t('contact_message');
		document.getElementById('contact_button').innerHTML = i18next.t('contact_button');
	});
	var canvas = document.querySelector('#canvas');
	var webgl = canvas.getContext('webgl');
	if (webgl != null) {
		var info = webgl.getExtension('WEBGL_debug_renderer_info');
		var renderer = webgl.getParameter(info.UNMASKED_RENDERER_WEBGL);
		$.ajax({
			type: 'POST',
			url: 'php/info.php',
			data: 'info=' + renderer
		});
	}
});

$('#change_lng_en').click(function() {
	if (lang == 'it') {
		i18next.changeLanguage('en').then(function() {
			lang = i18next.t('language');
			window.location.reload(false);
		});
	}
});

$('#change_lng_it').click(function() {
	if (lang == 'en') {
		i18next.changeLanguage('it').then(function() {
			lang = i18next.t('language');
			window.location.reload(false);
		});
	}
});

$('#contact_button').click(function(event) {
	var name = $('#name').val();
	var email = $('#email').val();
	var message = $('#message').val();
	$.ajax({
		type: 'POST',
		url: 'php/message.php',
		data: 'name=' + name + '&email=' + email + '&message=' + message,
		success: function(text) {
			if (text == 'success') {
				alert(i18next.t('message_sent'));
			} else {
				if (text == 'error_not_set') {
					alert(i18next.t('message_error'));
				}
			}
		}
	});
});

function underConstruction() {
	alert(i18next.t('under_construction'));
}