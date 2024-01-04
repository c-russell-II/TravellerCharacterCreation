const madge = require('madge');

madge("./src/index.tsx", {
	fileExtensions: ["js", "jsx", "ts", "tsx"],
	tsConfig: "./tsconfig.json",
})
	.then((res) => {
		console.log(res.obj());
		res.image("./testing/madge.svg");
	})
	.then((writtenImagePath) => {
		console.log(`Image written to ${writtenImagePath}`);
	});
    /*

	
	*/