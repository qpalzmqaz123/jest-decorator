import { AfterAll, AfterEach, BeforeAll, BeforeEach, Describe, Test } from "../src";

@Describe("Test jest decorator")
class TestJestDecorator {
    private count: number = 0;

    @BeforeAll
    private beforeAll() {
        this.count++;
    }

    @AfterAll
    private afterAll() {
        this.count++;
    }

    @BeforeEach
    private beforeEach() {
        this.count++;
    }

    @AfterEach
    private afterEach() {
        this.count++;
    }

    @Test("count should be 2")
    private test1() {
        expect(this.count).toBe(2);
    }

    @Test("test async function")
    private async test2() {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    @Test("count should be 6")
    private test3() {
        expect(this.count).toBe(6);
    }
}
