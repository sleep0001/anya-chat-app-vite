/**
 * 0~999までの整数を受け取って、3桁0パディングした文字列を返す。
 */
export const formatThreeDigitString = function(num: number):string {
    return num.toString().padStart(3, '0');
}