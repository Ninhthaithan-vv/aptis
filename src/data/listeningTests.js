export const listeningTests = Array.from({ length: 17 }, (_, index) => {
  const testNumber = index + 1;
  const isReady = testNumber <= 15;

  return {
    id: `test-${testNumber}`,
    title: `Test ${testNumber}`,
    description: isReady
      ? "Da co 17 cau hoi va dieu huong tung cau theo form."
      : "Noi dung se duoc cap nhat sau.",
    to: `/listening/test-${testNumber}`,
    status: isReady ? "ready" : "upcoming"
  };
});
