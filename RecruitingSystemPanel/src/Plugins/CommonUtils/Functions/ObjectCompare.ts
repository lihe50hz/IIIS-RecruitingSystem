/**
 * 比较两个constructor === Object的变量
 * @param obj1
 * @param obj2
 */
export const objectCompare = (obj1: Record<string, any>, obj2: Record<string, any>): boolean => {
	if (obj1 === obj2) return true;
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;
	for (const objKey of keys1) {
		const res = variableCompare(obj1[objKey], obj2[objKey]);
		if (!res) {
			return res;
		}
	}
	return true;
};

/**
 * 比较两个constructor === Array的变量
 * @important 比较Set和Array的时候，只考虑顺序完全一样的情况
 * @param arr1
 * @param arr2
 */
export const arrayCompare = (arr1: any[], arr2: any[]): boolean => {
	if (arr1 === arr2) return true;
	if (arr1.length !== arr2.length) return false;
	const res = arr1.some((v, i) => !variableCompare(v, arr2[i]));
	return !res;
};

/**
 * 比较两个constructor === Set的变量
 * @important 比较Set和Array的时候，只考虑顺序完全一样的情况
 * @param set1
 * @param set2
 */
const dataSetCompare = (set1: Set<any>, set2: Set<any>) => {
	if (set1 === set2) return true;
	if (set1.size !== set2.size) return false;
	const arr1 = Array.from(set1);
	const arr2 = Array.from(set2);
	return arrayCompare(arr1, arr2);
};

/**
 * 比较两个constructor === Map的变量
 * @param map1
 * @param map2
 */
const dataMapCompare = (map1: Map<any, any>, map2: Map<any, any>) => {
	if (map1 === map2) return true;
	if (map1.size !== map2.size) return false;
	map1.forEach((value, key) => {
			const isEqual = variableCompare(value, map2.get(key));
			if (!isEqual) return false;
		}
	);
	return true;
};

/**
 * 比较任意两个变量
 * @param var1
 * @param var2
 */
export const variableCompare = (var1: any, var2: any): boolean => {
	if (var1 === var2) return true;
	/* 两个元素不相同，又至少有一个是null/undefined */
	if (!var1 || !var2) return false;
	if (var1.constructor === Object && var2.constructor === Object) {
		return objectCompare(var1, var2);
	} else if (var1.constructor === Array && var2.constructor === Array) {
		return arrayCompare(var1, var2);
	} else if (var1.constructor === Set && var2.constructor === Set) {
		return dataSetCompare(var1, var2);
	} else if (var1.constructor === Map && var2.constructor === Map) {
		return dataMapCompare(var1, var2);
	} else return false;
};
