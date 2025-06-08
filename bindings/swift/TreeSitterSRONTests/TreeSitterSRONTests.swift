import XCTest
import SwiftTreeSitter
import TreeSitterSron

final class TreeSitterSronTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_sron())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading SRInternet-Object Notation grammar")
    }
}
