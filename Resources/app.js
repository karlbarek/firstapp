// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

function setupSettings(){
	var view = Ti.UI.createView({});
	
	var tableView = Ti.UI.createTableView({
		style:Ti.UI.iPhone.TableViewStyle.GROUPED,
		scrollable:true
	});

	var firstSection = Ti.UI.createTableViewSection({
		headerTitle:'First',
		footerTitle:'Lots of contextual information'
	});
	var firstRow = Ti.UI.createTableViewRow({
		title:'A setting',
		hasChild:true
	});
	
	var secondRow = Ti.UI.createTableViewRow({height:50});
	
	var theTitle = Ti.UI.createLabel({
		text:'The title',
		font:{fontSize:'16', fontWeight:'bold'},
		minimumFontSize:'12',
		textAlign:'left',
		top:'2',
		left:'10',
		height:'20'
	});
	secondRow.add(theTitle);
	
	var theSnippet = Ti.UI.createLabel({
		text:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
		font:{fontSize:'11', fontWeight:'normal'},
		textAlign:'left',
		color:'#666',
		bottom:'0',
		left:'10',
		height:'26'
		
	});
	secondRow.add(theSnippet);

	firstSection.add(firstRow);
	firstSection.add(secondRow);
	tableView.setData([firstSection]);
	view.add(tableView);

	return view;
}



// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

function isAndroid(){
	return (Ti.Platform.name == 'android');
}

function addMenu(win){
	if(isAndroid()){
		var activity = win.activity;
		activity.onCreateOptionsMenu = function(e){
			var firstItem = e.menu.add({title:'First Item'});
			firstItem.addEventListener("click", function(e){
				Ti.API.debug('First Item');
			});
			
			var secondItem = e.menu.add({title:'Second Item'});
			secondItem.addEventListener("click", function(e){
				Ti.API.warn('Second Item');
			});
			
			var thirdItem = e.menu.add({title:'Third Item'});
			thirdItem.addEventListener("click", function(e){
				alert('Third Item');
			});
		};
	}
}

win1.add(label1);
addMenu(win1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var view = Ti.UI.createView({
	top:40,
	bottom:'50%',
	left:20,
	right:'50%',
	backgroundColor:'red'
});

var button1 = Ti.UI.createButton({
	title:'Button in View',
	top:10,
	left:10
});

button1.addEventListener('click', function(e){
	alert("You clicked me!");
});


win2.add(view);
win2.add(label2);
view.add(button1);

//settings window
var winSettings = Ti.UI.createWindow({
});

var tabSettings = Ti.UI.createTab({
	icon:'KS_nav_views.png',
	title:'Settings',
	window:winSettings
});

winSettings.add(setupSettings());


//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tabSettings);

// open tab group
tabGroup.open();
