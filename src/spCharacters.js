export const loginId = (loginId) => {
    let _reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    return _reg.test(loginId);
}