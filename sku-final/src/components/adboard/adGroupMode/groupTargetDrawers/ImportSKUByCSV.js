import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { MdBackup } from 'react-icons/md';
import { lightenDarkenColor, useCSVReader } from 'react-papaparse';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#ff5050';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(DEFAULT_REMOVE_HOVER_COLOR, 40);
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed #1562ffb3`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  file: {
    background: 'white',
    borderRadius: 20,
    display: 'flex',
    height: 100,
    width: 100,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  },
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  },
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoneHover: {
    borderColor: GREY_DIM,
  },
  default: {
    borderColor: GREY,
  },
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  },
};

export default function CsvReaderForImportSku() {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(DEFAULT_REMOVE_HOVER_COLOR);

  return (
    <CSVReader
      onUploadAccepted={(results) => {}}
      onDragOver={(event) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setZoneHover(false);
      }}
    >
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps, Remove }) => (
        <>
          <Box
            {...getRootProps()}
            style={Object.assign({}, styles.zone, zoneHover && styles.zoneHover)}
            sx={{ cursor: 'pointer' }}
          >
            <Container>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '25px',
                      color: '#1562ff80',
                    }}
                  >
                    <MdBackup />
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: '14px',
                      color: 'gray',
                      lineHeight: '5px',
                    }}
                  >
                    Import
                  </Typography>
                </Box>
              </Box>
            </Container>
          </Box>
        </>
      )}
    </CSVReader>
  );
}
