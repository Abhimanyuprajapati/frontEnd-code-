export default function handler(req, res) {
    res.send([{
		"relation": ["delegate_permission/common.handle_all_urls"],
		"target": {
			"namespace": "android_app",
			"package_name": "com.filmcityi.android",
			"sha256_cert_fingerprints": [
				"4B:D0:86:4E:55:C2:53:FE:77:9E:6C:9E:62:7E:3F:FD:60:EF:C0:40:78:84:10:9E:92:EE:B8:09:34:26:5D:B8",
				"DB:8A:F9:24:28:76:90:39:BE:94:AF:A1:87:2B:D4:1F:A6:81:72:A4:84:F3:B9:E6:CF:8F:36:92:9A:E2:E4:50"
			]
		}
	}]); // Send your `robots.txt content here
}