import {
  useMediaQuery,
  Paper,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Popper,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material";
import {
  SortOutlined,
  FilterAltOutlined,
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
const SortMenu = ({ onSortCriteriaChange, onFilterCriteriaChange }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1300px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [isFilterMenuVisible, setIsFilterSortMenuVisible] = useState(false);

  const { palette } = useTheme();
  const main = palette.neutral.main;
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
  };
  const setFilterCriteriaClick = (filterCriteria) => {
    onFilterCriteriaChange(filterCriteria);
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
                  transform: "scale(1.1) ",
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
                  transform: "scale(1.1) ",
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
                  transform: "scale(1.1) ",
                  cursor: "pointer",
                },
              }}
            >
              <ListItemText>Location </ListItemText>
            </ListItem>
            <ListItem
              onClick={() => setFilterCriteriaClick("ISO")}
              sx={{
                "&:hover": {
                  transition: "all 0.3s",
                  transform: "scale(1.1) ",
                  cursor: "pointer",
                },
              }}
            >
              <ListItemText>ISO</ListItemText>
            </ListItem>
          </List>
        </Paper>
      </Popper>
    </div>
  );
};

export default SortMenu;
