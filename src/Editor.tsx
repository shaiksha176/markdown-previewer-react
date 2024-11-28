import React, { useState } from "react";
import { TextField, Box, Typography, Paper, Button } from "@mui/material";
import { marked } from "marked";
import Grid from "@mui/material/Grid2";
import { saveAs } from "file-saver";

const Editor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");

  marked.setOptions({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkdown(event.target.value);
  };

  const convertMarkdownToHTML = (markdownText: string) => {
    return marked(markdownText);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    saveAs(blob, "my-markdown.md");
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("No file selected.");
      return;
    }

    if (file.type === "text/markdown" || file.name.endsWith(".md")) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setMarkdown(content);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid Markdown file (.md).");
    }
  };
  return (
    <Box
      sx={{
        py: 2,
      }}
    >
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          fontSize: { md: "30px", xs: "18px" },
          fontWeight: "bold",
        }}
      >
        MARKDOWN PREVIEWER
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          py: 2,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
        }}
      >
        <Button variant="contained" component="label">
          Import Markdown
          <input type="file" accept=".md" hidden onChange={handleFileUpload} />
        </Button>
        <Button variant="contained" onClick={downloadMarkdown}>
          Download Markdown
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setMarkdown("")}
        >
          Reset
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ md: 6, xs: 12 }}>
          <Paper
            elevation={3}
            sx={{
              height: { md: "500px", xs: "300px" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" align="center" padding={2}>
              Markdown Editor
            </Typography>
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: 2,
                borderTop: "1px solid #ccc",
              }}
            >
              <TextField
                fullWidth
                multiline
                variant="outlined"
                value={markdown}
                onChange={handleInputChange}
                placeholder="Start typing Markdown here..."
                sx={{
                  padding: 1,
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Paper
            elevation={3}
            sx={{
              height: { md: "500px", xs: "300px" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" padding={2} sx={{ textAlign: "center" }}>
              Live Preview
            </Typography>
            <Box
              dangerouslySetInnerHTML={{
                __html: convertMarkdownToHTML(markdown),
              }}
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: 2,
                borderTop: "1px solid #ccc",
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Editor;
