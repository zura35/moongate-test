/**
 * Identify and fix Single Responsibility Principle (SRP) violations in the following code.
 */

class FileHandler {
    read(filePath: string): string {
        // Read and return the file contents.
        return "";
    }

    write(filePath: string, content: string): void {
        // Write the content to the file.
    }

    compress(filePath: string, format: string): void {
        // Compress the file using the specified format.
    }
}
