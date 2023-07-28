/**
 * Identify and fix Liskov Substitution Principle (LSP) violations in the following code.
 */

class Bird {
    fly(): void {
        // Fly implementation.
    }
}

class Penguin extends Bird {
    fly(): void {
        throw new Error("Penguins can't fly.");
    }
}
