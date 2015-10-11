// prepopulating some contacts for the demo

if(Contacts.find().count()===0){
	var contactList  = [
		{
			name: "Chell",
			email: "chell@notgmail.com"
		},
		{
			name: "GLaDOS",
			email: "glados@notapple.com"
		},		
		{
			name: "Rick",
			email: "rick@portcal.org"
		},{
			name: "Carol",
			email: "carol#portcal.org"
		}
	]
	for(var contact in contactList){
		Contacts.insert(contactList[contact]);
	}
}