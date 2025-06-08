package tree_sitter_sron_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_sron "github.com/pizerolol/tree-sitter-sron/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_sron.Language())
	if language == nil {
		t.Errorf("Error loading SRInternet-Object Notation grammar")
	}
}
