/** 中文字符变成数字 */
export function chineseToNumber(ch: string) {
	switch (ch) {
		// case '一':
		//     return 1
		case "二":
			return 2;
		case "三":
			return 3;
		case "四":
			return 4;
		case "五":
			return 5;
		case "六":
			return 6;
		case "七":
			return 7;
		case "八":
			return 8;
		case "九":
			return 9;
		case "半":
			return 0.5;
		case "十":
			return 10;
		case "百":
			return 100;
		case "千":
			return 1000;
		default:
			return 1;
	}
}

export function getBranchName(url: string): string {
	const branchName = url.split(".")[1];
	return branchName === undefined ? "master" : branchName;
}

export function randomString(len: number, letter: boolean = true): string {
	const str = (letter ? "" : "0123456789") + "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
	let result = "";
	Array(len)
		.fill(null)
		.forEach(() => {
			result += str[Math.floor(Math.random() * str.length)];
		});
	return result;
}

export function isJson(str: string): boolean {
	try {
		JSON.parse(str);
		return true;
	} catch (e) {
		return false;
	}
}
