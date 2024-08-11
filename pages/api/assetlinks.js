export default function handler(req, res) {
    res.send([{
		"relation": ["delegate_permission/common.handle_all_urls"],
		"target": {
			"namespace": "android_app",
			"package_name": "com.jalva.android",
			"sha256_cert_fingerprints": [
				"5D:09:8F:C1:D9:F7:FA:11:29:DF:32:03:68:28:8E:78:81:8B:AA:74:B5:7A:BB:70:C7:2D:34:18:08:54:8F:24",
				"ED:BA:01:0E:E7:D3:64:AA:B5:10:8B:9B:B9:8B:F1:B2:CF:5A:CB:DE:2C:43:9D:E7:5C:77:E3:95:1D:2D:6A:D0"
			]
		}
	}]
	); // Send your `robots.txt content here
}