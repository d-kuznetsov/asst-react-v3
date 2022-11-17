import { memo } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function Dropzone({ value: files, onUpdate }) {
  // console.log("RENDER Dropzone");
  const handleDrop = (filesToAdd) => {
    const newFiles = [...files];

    filesToAdd.forEach((fileToAdd) => {
      if (!files.find((file) => file.path === fileToAdd.path)) {
        newFiles.push(fileToAdd);
      }
    });

    onUpdate(newFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });
  const handleDelete = (path) => {
    const idx = files.findIndex((file) => file.path === path);
    if (idx !== undefined) {
      onUpdate(files.slice(0, idx).concat(files.slice(idx + 1)));
    }
  };

  return (
    <Box>
      <Box
        {...getRootProps({
          sx: {
            p: 2,
            mb: 2,
            border: isDragActive ? "2px solid" : "2px dashed",
            borderColor: isDragActive ? "primary.main" : "text.secondary",
            borderRadius: 1,
            minHeight: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey.100",
          },
        })}
      >
        <input {...getInputProps()} />
        <Box>
          Ziehen Sie eine oder mehrere Dateien in dieses Feld oder klicken, um
          eine Datei auszuwählen
        </Box>
      </Box>
      <Stack spacing={1}>
        {files.map((file) => {
          return (
            <Chip
              key={file.path}
              label={file.path}
              color="primary"
              variant="outlined"
              onDelete={() => handleDelete(file.path)}
            />
          );
        })}
      </Stack>
    </Box>
  );
}

export default memo(Dropzone);
