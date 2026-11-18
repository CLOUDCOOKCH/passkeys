import { describe, expect, it } from 'vitest';
import { questions } from '../src/content/resourcesQuiz';
import { emptyQuiz, quizScore, readQuiz } from '../src/lib/quiz';

describe('quiz progress', () => {
  it('can restore the answer feedback before advancing', () => {
    expect(readQuiz('{"page":1,"answers":[1,0]}')).toEqual({ page: 1, answers: [1, 0] });
  });
  it.each([null, '{', 'null', '{"page":1,"answers":[]}', '{"page":6,"answers":[0]}', '{"page":0,"answers":[7]}'])('recovers from invalid progress %s', raw => {
    expect(readQuiz(raw)).toEqual(emptyQuiz());
  });
  it('scores full, partial and wrong answers using the same key in both languages', () => {
    const correct = [1, 2, 0, 1, 0, 2];
    expect(questions).toHaveLength(6);
    expect(quizScore(correct)).toBe(6);
    expect(quizScore([1, 0])).toBe(1);
    expect(quizScore([0, 0])).toBe(0);
    expect(readQuiz(JSON.stringify({page: 6, answers: correct}))).toEqual({page: 6, answers: correct});
  });
});
