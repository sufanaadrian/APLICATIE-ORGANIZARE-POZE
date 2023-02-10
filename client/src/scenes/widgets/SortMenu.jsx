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
} from "@mui/material";
import { useTheme } from "@mui/material";
import {
  SortOutlined,
  FilterAltOutlined,
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
  GridViewOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
const SortMenu = ({
  onSortCriteriaChange,
  onFilterCriteriaChange,
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
  const handleSortMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsSortMenuVisible(!isSortMenuVisible);
    setTimeout(() => {
      setIsSortMenuVisible(false);
    }, 10000);
    setIsFilterSortMenuVisible(false);
  };
  const handleFilterMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsFilterSortMenuVisible(!isFilterMenuVisible);
    setIsSortMenuVisible(false);
  };
  const setCriteriaClick = (sortCriteria) => {
    onSortCriteriaChange(sortCriteria);
    setIsSortMenuVisible(false);
  };
  const setFilterCriteriaClick = (filterCriteria) => {
    onFilterCriteriaChange(filterCriteria);
    setIsFilterSortMenuVisible(!isFilterMenuVisible);
  };
  const handleXlButtonClick = () => {
    onXLChange(xl === 1 ? 2 : 1);
    setXl(xl === 1 ? 2 : 1);
  };
  return (
    <div>
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
                label="FocalLength Ex: 50mm"
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
    </div>
  );
};

export default SortMenu;
