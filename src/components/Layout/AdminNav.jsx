import styled from "@emotion/styled";
import { useResetRecoilState, useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  ListItem,
  IconButton,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";

import { sortState } from "../../state/sort";
import { adminCategoriesState } from "../../state/categories";
import useGetCategories from "../../hooks/query/category/useGetCategories";
import usePatchReorderCategories from "../../hooks/mutation/category/usePatchReorderCategories";
import usePatchCategory from "../../hooks/mutation/category/usePatchCategory";
import useDeleteCategory from "../../hooks/mutation/category/useDeleteCategory";
import usePostCategory from "../../hooks/mutation/category/usePostCategory";
import StrictModeDroppable from "../Common/StrictModeDroppable";
import useToastMessage from "../../hooks/common/useToastMessage";

const AdminNav = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [editMode, setEditMode] = useState({
    isReorder: false,
    isEdit: false,
    onEditMode: false,
  });
  const [editCategory, setEditCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const resetSort = useResetRecoilState(sortState);
  const [adminCategories, setAdminCategories] =
    useRecoilState(adminCategoriesState);
  const { data, isLoading } = useGetCategories();
  const { mutate: reorderPatchMutate } = usePatchReorderCategories();
  const { mutate: categortPatchMutate } = usePatchCategory();
  const { mutate: deleteMutate } = useDeleteCategory();
  const { mutate: postMutate } = usePostCategory();
  const showToast = useToastMessage();
  const isNotEditing = !editMode.isReorder && !editMode.isEdit;

  const handleChange = (result) => {
    if (!result.destination) return;

    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const orderList = items.map((item) => item.id);
    setAdminCategories(items);
    reorderPatchMutate(orderList);
  };

  return (
    <NavWrapper>
      <Toolbar sx={{ margin: "15px 0px", position: "fixed", top: 0 }}>
        <StyledTypography
          onClick={() => {
            resetSort();
            setEditMode({
              isReorder: false,
              isEdit: false,
              onEditMode: false,
            });
            setNewCategory("");
            navigate("/admin");
          }}
        >
          Lampang Admin
        </StyledTypography>
      </Toolbar>
      {!isLoading && (
        <List>
          {!editMode.onEditMode ? (
            data.map((category) => (
              <StyledListItemButton
                key={category.id}
                onClick={() => {
                  resetSort();
                  navigate(`/admin/categories/${category.id}`);
                }}
                selected={category.id === Number(params?.categoryId)}
              >
                <ListItemText
                  sx={{ marginLeft: "20px" }}
                  primary={category.name}
                />
              </StyledListItemButton>
            ))
          ) : editMode.isReorder ? (
            <DragDropContext onDragEnd={handleChange}>
              <StrictModeDroppable droppableId="categories">
                {(provided) => (
                  <div
                    className="categories"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {adminCategories.map((category, i) => (
                      <Draggable
                        index={i}
                        draggableId={`${category.id.toString()}`}
                        key={`${category.id.toString()}`}
                      >
                        {(provided, { isDragging }) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                background: isDragging
                                  ? "rgb(85, 108, 214, 0.15)"
                                  : "transparent",
                              }}
                            >
                              <StyledListItemButton>
                                <ListItemIcon sx={{ marginLeft: "10px" }}>
                                  <MenuIcon />
                                </ListItemIcon>
                                <ListItemText primary={category.name} />
                              </StyledListItemButton>
                            </div>
                          );
                        }}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </DragDropContext>
          ) : (
            adminCategories.map((category, i) =>
              category?.isEditItem ? (
                <ListItem
                  secondaryAction={
                    <>
                      <IconButton
                        onClick={() => {
                          setEditMode((p) => ({ ...p, isEdit: false }));
                          setAdminCategories(data);
                        }}
                      >
                        <ReplayIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setAdminCategories((p) => {
                            const updatedItem = {
                              ...p[i],
                              isEditItem: false,
                            };

                            const temp = [...p];
                            temp[i] = updatedItem;

                            return temp;
                          });
                          setEditMode((p) => ({ ...p, isEdit: false }));
                          categortPatchMutate({
                            id: category.id,
                            name: editCategory,
                          });
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </>
                  }
                  key={category.id}
                >
                  <TextField
                    sx={{ width: "150px" }}
                    size="small"
                    label="카테고리명"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  />
                </ListItem>
              ) : (
                <ListItem
                  secondaryAction={
                    <>
                      <IconButton
                        onClick={() => {
                          setEditMode((p) => ({ ...p, isEdit: true }));
                          setEditCategory(category.name);
                          setAdminCategories((p) => {
                            const updatedItem = { ...p[i], isEditItem: true };

                            const temp = p.map((item) => ({
                              ...item,
                              isEditItem: false,
                            }));
                            temp[i] = updatedItem;

                            return temp;
                          });
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          deleteMutate(category.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                  key={category.id}
                >
                  <ListItemText
                    sx={{ marginLeft: "15px" }}
                    primary={category.name}
                  />
                </ListItem>
              )
            )
          )}
        </List>
      )}
      <ButtonBox>
        {editMode.onEditMode && !editMode.isEdit && (
          <>
            <StyledButton
              variant="outlined"
              onClick={() =>
                setEditMode((p) => ({ ...p, isReorder: !p.isReorder }))
              }
            >
              {editMode.isReorder ? "순서변경 완료" : "카테고리 순서변경"}
            </StyledButton>
          </>
        )}
      </ButtonBox>
      <ButtonBox>
        {editMode.onEditMode && isNotEditing && (
          <>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                marginTop: "20px",
              }}
            >
              카테고리 추가
            </Typography>
            <ListItem
              secondaryAction={
                <StyledButton
                  onClick={() => {
                    if (newCategory.length === 0) {
                      showToast("warning", "빈값은 추가할 수 없습니다.");
                      return;
                    }
                    postMutate({ name: newCategory });
                    setNewCategory("");
                  }}
                  sx={{ padding: "6.75px 0px" }}
                  variant="outlined"
                >
                  추가
                </StyledButton>
              }
            >
              <TextField
                sx={{ width: "195px" }}
                size="small"
                value={newCategory}
                label="카테고리명"
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </ListItem>
          </>
        )}
        {isNotEditing && (
          <StyledButton
            sx={{ margin: "20px 0px" }}
            variant="contained"
            onClick={() =>
              setEditMode((p) => ({ ...p, onEditMode: !p.onEditMode }))
            }
          >
            {editMode.onEditMode ? "관리완료" : "카테고리 관리"}
          </StyledButton>
        )}
        {!editMode.onEditMode && isNotEditing && (
          <Button
            sx={{ marginBottom: "20px" }}
            onClick={() => navigate("/admin/new-product")}
            variant="contained"
          >
            상품추가
          </Button>
        )}
      </ButtonBox>
    </NavWrapper>
  );
};

const NavWrapper = styled("nav")(({ theme }) => ({
  position: "fixed",
  top: 0,
  bottom: 0,
  marginTop: "90px",
  width: "300px",
  background: "#fff",
  overflowY: "scroll",
  overflowX: "hidden",
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontSize: "17px",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.primary.main,
  },
  cursor: "pointer",
  fontSize: "28px",
  fontWeight: "bold",
}));

const ButtonBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledButton = styled(Button)(() => ({
  fontWeight: 600,
}));

export default AdminNav;
