function Del(i){
	timer.users[i] = 0;
	timer.user = -1;	
	timer.render();
}

function Start(i){
	timer.user = i;
}

function Stop(){
	timer.user = -1;
	timer.render();
}

user_map = [
	{
		name: 'Общая информация:', 
		class: ''
	},{
		name: 'Коротенко Андрей', 
		class: 'boss'
	},{
		name: 'Вдовин Сергей', 
		class: 'VSglyphicon glyphicon-send f_blue'
	},{
		name: 'Гаврилова Амида', 
		class: 'VSglyphicon glyphicon-lamp f_orange'
	},{
		name: 'Голещихин Николай', 
		class: 'programmer'
	},{
		name: 'Городецкий Егор', 
		class: 'VSglyphicon glyphicon-sunglasses f_dark'
	},{
		name: 'Кучкарова Лариса', 
		class: 'VSglyphicon glyphicon-book f_orange'
	},{
		name: 'Рогов Максим', 
		class: 'VSglyphicon glyphicon-flash f_orange'
	},{
		name: 'Селихов Алексей', 
		class: 'VSglyphicon glyphicon-paperclip f_dark'
	},{
		name: 'Эйрих Арина', 
		class: 'VSglyphicon glyphicon-apple f_red'
	},{
		name: 'Янько Анастасия', 
		class: 'VSglyphicon glyphicon-leaf f_green'
	},{
		name: 'Слепнев Олег', 
		class: 'boss'
	},{
		name: 'Черкасов Александр', 
		class: 'VSglyphicon glyphicon-fire f_red'
	},{
		name: 'Коваленко Светлана', 
		class: 'boss'
	},{
		name: 'Итого:', 
		class: ''
	},
];

timer = {
	total: 0,
	s_max: 2 * 60, 
	users: [],
	user: -1,

	tik_tak: function(){
		// setup
		if(timer.users && timer.users.length == 0){
			i_max = $('.users tr').length;
			for (let i = 0; i < i_max - 1; i++) {
				timer.users[i] = 0;
			}
		}
		// timer 
		if(timer.user>=0){
			if(isNaN(timer.users[timer.user])){
				timer.users[timer.user] = 0;
			}
			timer.users[timer.user]++;
			timer.total++;
			timer.render();			
		}
	},

	render: function(){
		i_max = $('.users tr').length;
		for (let i = 0; i < i_max - 1; i++) {
			if(timer.users[i] > timer.s_max ){
				color = '#fdd1da';
			}else if(i == timer.user ) {
				color = '#d4f9df';
			}else {
				color = '#fff';
			}
			tr = $('.users tr').eq(i);
			tr.css({'background-color':color});	
			
			// time stamp
			tr.find('td').eq(2).html( timer.render_time(timer.users[i]) );

			// bar 
			width = (100 * timer.users[i])/(2 * timer.s_max);
			tr.find('.bar').eq(0).css({'width': (width>=98 ? "98%" : width.toFixed(0))+"%"});
		}
		// итого
		if(timer.total>0){
			$('.users tr:last-child').find('td').eq(2).html( timer.render_time(timer.total) );
		}
	},

	render_time: function(timestamp){
		hh = Math.floor(timestamp / (60 * 60));
		mm = Math.floor((timestamp - (hh * 60 * 60)) / 60);
		ss = timestamp % 60;

		return hh.toString().padStart(2, '0') + ':' + 
			mm.toString().padStart(2, '0') + ':' + 
			ss.toString().padStart(2, '0');;
	},

	build: function(user_map){
		if(!user_map){ return false; }
		var table = 'TABLE.users';
		$(table).html(''); // clean table
		for (let i = 0; i < user_map.length; i++) {
			var user = user_map[i];
			var click = (i == user_map.length - 1 ? 'Stop' : 'Start')
			$(table).append('<tr>'+
			'<td width="290px"><span class="'+user.class+'"></span>'+user.name+'</td>'+
			'<td width="40px"><button onclick="'+click+'('+i+')" class="btn btn-primary" style="margin: 4px 0;">'+click+'</button></td>'+
			'<td width="110px">00:00:00</td>'+
			'<td><div class=bar>&nbsp;</div><div class=bar_limit>&nbsp;</div></td>'+
			'</tr>');
		}
	}
}