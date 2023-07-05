import {
  Paper,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Popper,
  IconButton,
  TextField,
  Button,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@mui/material";
import {
  SortOutlined,
  FilterAltOutlined,
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
  GridViewOutlined,
  PictureAsPdfOutlined,
  ColorLensOutlined,
} from "@mui/icons-material";
import { generatePDF } from "components/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SketchPicker } from "react-color";
const SortMenu = ({
  onSortCriteriaChange,
  onFilterCriteriaChange,
  onColorCriteriaChange,
  onXLChange,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [isFilterMenuVisible, setIsFilterSortMenuVisible] = useState(false);
  const { palette } = useTheme();
  const [isoInput, setIsoInput] = useState("");
  const [apertureInput, setApertureInput] = useState("");
  const [exposureInput, setExposureInput] = useState("");
  const [focalLengthInput, setFocalLengthInput] = useState("");
  const [makeInput, setMakeInput] = useState("");
  const [modelInput, setModelInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [xl, setXl] = useState(1);
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    const handleScroll = () => {
      if (isSortMenuVisible || isFilterMenuVisible) {
        setIsSortMenuVisible(false);
        setIsFilterSortMenuVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSortMenuVisible, isFilterMenuVisible]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleConfirmClick = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmClose = (confirmed) => {
    setIsConfirmDialogOpen(false);
    if (confirmed) {
      handleGeneratePDF();
    }
  };
  const handleGeneratePDF = () => {
    generatePDF(token, loggedInUserId);
  };
  const handleColorMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsColorPickerVisible(!isColorPickerVisible);
    setIsFilterSortMenuVisible(false);
    setIsSortMenuVisible(false);
  };
  const handleSortMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsSortMenuVisible(!isSortMenuVisible);
    setIsFilterSortMenuVisible(false);
    setIsColorPickerVisible(false);
  };
  const handleFilterMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsFilterSortMenuVisible(!isFilterMenuVisible);
    setIsSortMenuVisible(false);
    setIsColorPickerVisible(false);
  };
  const setCriteriaClick = (sortCriteria) => {
    onSortCriteriaChange(sortCriteria);
    setIsSortMenuVisible(false);
  };
  const setFilterCriteriaClick = (filterCriteria) => {
    onFilterCriteriaChange(filterCriteria);
    setIsFilterSortMenuVisible(!isFilterMenuVisible);
  };
  const setColorPickerValue = (filterCriteria) => {
    onColorCriteriaChange(filterCriteria);
    setIsColorPickerVisible(!isColorPickerVisible);
  };
  const handleXlButtonClick = () => {
    onXLChange(xl === 1 ? 2 : 1);
    setXl(xl === 1 ? 2 : 1);
  };

  return (
    <div>
      <IconButton onClick={handleColorMenuClick}>
        <ColorLensOutlined />
      </IconButton>
      <Popper
        anchorEl={anchorEl}
        open={isColorPickerVisible}
        placement="top-start"
        disablePortal={true}
        style={{
          zIndex: "1",
          opacity: "1",
          backgroundColor: "rgba(0,0,0,0.5",
        }}
      >
        {isColorPickerVisible && (
          <div style={{ backgroundColor: selectedColor, borderRadius: "3%" }}>
            <SketchPicker
              color={selectedColor}
              onChange={(color) => setSelectedColor(color.hex)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{
                  borderRadius: "3%",
                  color: "white",
                }}
                size="small"
                onClick={() => setColorPickerValue(selectedColor)}
              >
                Filter
              </Button>
            </div>
          </div>
        )}
      </Popper>
      {/* SORT DATA */}
      <IconButton onClick={handleSortMenuClick} color={palette.primary.medium}>
        <SortOutlined />
      </IconButton>

      <Popper
        anchorEl={anchorEl}
        open={isSortMenuVisible}
        placement="top-start" // Set the placement of the menu relative to the anchor element
        disablePortal={true} // Prevent the menu from being rendered in a separate portal element
        style={{
          zIndex: "1",
          opacity: "1",
          backgroundColor: "rgba(0,0,0,0.5",
        }}
      >
        <Paper>
          <List>
            <ListItem>
              <ListItemText style={{ color: palette.primary.dark }}>
                Sort by:
              </ListItemText>
            </ListItem>

            <ListItem
              onClick={() => setCriteriaClick("dateUp")}
              sx={{
                "&:hover": {
                  transition: "all 0.3s",
                  transform: "scale(1.1) ",
                  backgroundColor: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <ListItemText>Date </ListItemText>
              <ListItemIcon>
                <ArrowUpwardOutlined fontSize="small" />
              </ListItemIcon>
            </ListItem>
            <ListItem
              onClick={() => setCriteriaClick("dateDown")}
              sx={{
                "&:hover": {
                  transition: "all 0.3s",
                  transform: "scale(1.1) ",
                  backgroundColor: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <ListItemText>Date </ListItemText>
              <ListItemIcon>
                <ArrowDownwardOutlined fontSize="small" />
              </ListItemIcon>
            </ListItem>
            <ListItem
              onClick={() => setCriteriaClick("likes")}
              sx={{
                "&:hover": {
                  transition: "all 0.3s",
                  transform: "scale(1.1) ",
                  backgroundColor: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <ListItemText>Likes</ListItemText>
            </ListItem>
          </List>
        </Paper>
      </Popper>

      {/* FILTER DATA */}
      <IconButton
        onClick={handleFilterMenuClick}
        color={palette.primary.medium}
      >
        <FilterAltOutlined />
      </IconButton>
      <Dialog
        open={isConfirmDialogOpen}
        onClose={() => handleConfirmClose(false)}
      >
        <DialogTitle>{"Do you want to generate a PDF?"}</DialogTitle>

        <DialogActions>
          <Button onClick={() => handleConfirmClose(false)}>No</Button>
          <Button onClick={() => handleConfirmClose(true)}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Popper
        anchorEl={anchorEl}
        open={isFilterMenuVisible}
        placement="top-start" // Set the placement of the menu relative to the anchor element
        disablePortal={true} // Prevent the menu from being rendered in a separate portal element
        style={{
          zIndex: "1",
          opacity: "1",
          backgroundColor: "rgba(0,0,0,0.5",
        }}
      >
        <Paper>
          <List>
            <ListItem>
              <ListItemText style={{ color: palette.primary.dark }}>
                Filter by:
              </ListItemText>
            </ListItem>
            <ListItem
              onClick={() => setFilterCriteriaClick("showAll")}
              sx={{
                "&:hover": {
                  transition: "all 0.3s",
                  backgroundColor: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <ListItemText>Show all </ListItemText>
            </ListItem>
            <ListItem
              onClick={() => setFilterCriteriaClick("isOnFeed")}
              sx={{
                "&:hover": {
                  transition: "all 0.3s",
                  backgroundColor: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              <ListItemText>Is on feed </ListItemText>
            </ListItem>
            <ListItem
              onClick={() => setFilterCriteriaClick("isSharableCheck")}
              sx={{
                "&:hover": {
                  transition: "all 0.3s",
                  cursor: "pointer",
                  backgroundColor: palette.primary.light,
                },
              }}
            >
              <ListItemText>Location </ListItemText>
            </ListItem>
            <ListItem>
              <TextField
                label="ISO Ex: 100"
                size="small"
                onChange={(event) => setIsoInput(event.target.value)}
              />
              <Button
                onClick={() => setFilterCriteriaClick("ISO:" + isoInput)}
                size="small"
              >
                Filter
              </Button>
            </ListItem>
            <ListItem>
              <TextField
                label="Aperture Ex: f/1.8"
                size="small"
                onChange={(event) => setApertureInput(event.target.value)}
              />
              <Button
                onClick={() => setFilterCriteriaClick("f/" + apertureInput)}
                size="small"
              >
                Filter
              </Button>
            </ListItem>
            <ListItem>
              <TextField
                label="Exposure Ex: 1/320"
                size="small"
                onChange={(event) => setExposureInput(event.target.value)}
              />
              <Button
                onClick={() => setFilterCriteriaClick("1/" + 1 / exposureInput)}
                size="small"
              >
                Filter
              </Button>
            </ListItem>
            <ListItem>
              <TextField
                label="FLength Ex: 50mm"
                size="small"
                onChange={(event) => setFocalLengthInput(event.target.value)}
              />
              <Button
                onClick={() => setFilterCriteriaClick("mm:" + focalLengthInput)}
                size="small"
              >
                Filter
              </Button>
            </ListItem>
            <ListItem>
              <TextField
                label="Make Ex: Canon"
                size="small"
                onChange={(event) => setMakeInput(event.target.value)}
              />
              <Button
                onClick={() => setFilterCriteriaClick("make:" + makeInput)}
                size="small"
              >
                Filter
              </Button>
            </ListItem>
            <ListItem>
              <TextField
                label="Model Ex: 5D Mark IV"
                size="small"
                onChange={(event) => setModelInput(event.target.value)}
              />
              <Button
                onClick={() => setFilterCriteriaClick("model:" + modelInput)}
                size="small"
              >
                Filter
              </Button>
            </ListItem>
            <ListItem>
              <TextField
                label="Date Ex: 2022:09:11"
                size="small"
                onChange={(event) => setDateInput(event.target.value)}
              />
              <Button
                type="date"
                onClick={() => setFilterCriteriaClick("date=" + dateInput)}
                size="small"
              >
                Filter
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Popper>

      <IconButton
        style={{
          position: "absolute",
          right: 0,
          margin: isNonMobile ? "0 3rem 0 0" : "0 1rem 0 0",
        }}
        onClick={handleXlButtonClick}
        color={palette.primary.medium}
      >
        <GridViewOutlined />
      </IconButton>
      <IconButton
        style={{
          position: "absolute",
          right: 40,
          margin: isNonMobile ? "0 3rem 0 0" : "0 1rem 0 0",
        }}
        onClick={handleConfirmClick}
        color={palette.primary.medium}
      >
        <PictureAsPdfOutlined />
      </IconButton>
      <IconButton
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          margin: isNonMobile ? "0 3rem 0 0" : "0 1rem 0 0",
          zIndex: "1",
        }}
        onClick={handleScrollToTop}
        color={palette.primary.medium}
      >
        <ArrowUpwardOutlined />
      </IconButton>
    </div>
  );
};

export default SortMenu;
