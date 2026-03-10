export const readingTests = Array.from({ length: 15 }, (_, index) => {
  const testNumber = index + 1;
  const isReady = testNumber <= 13;

  return {
    id: `reading-test-${testNumber}`,
    title: `Test ${testNumber}`,
    description: isReady
      ? "Reading test nay da co noi dung va co the lam bai, submit, cham diem."
      : "Noi dung reading test nay chua duoc them.",
    to: `/reading/test-${testNumber}`,
    status: isReady ? "ready" : "placeholder"
  };
});
