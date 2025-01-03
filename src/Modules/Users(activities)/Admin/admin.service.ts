 
import prisma from "../../../config/prisma.config";
import { Request } from "express";
 

// cteate category
const createCategory = async (payload: { name: string,logo:string }) => {
 
 
  const result = await prisma.category.create({
    data: {
      name: payload.name,
      logo:payload.logo
    },
  });
  return result;
};

// manage category.
const manageCategory = async (payload: Request) => {
  if (payload.query?.delete === "true") {
    const result = await prisma.$transaction(async (tnx) => {
      const productDelete = await tnx.product.deleteMany({
        where: {
          categoryId: payload.params?.id,
        },
      });
      const categoryDelete = await tnx.category.delete({
        where: {
          categoryId: payload.params?.id,
        },
      });
      return { productDelete, categoryDelete };
    });

    return {
      delete: true,
      message: "category deleted.",
      result,
    };
  }

  const result = await prisma.category.update({
    where: {
      categoryId: payload.params?.id,
    },
    data: payload.body,
  });
  return result;
};

// manage shop
const manageShop = async (payload: Request) => {
  const result = await prisma.shop.update({
    where: {
      shopId: payload.params.id,
    },
    data: payload.body,
  });
  return result;
};

// manage user  (w)
const manageuser = async (payload: Request) => {
  if (payload.query.delete === "true") {
    const result = await prisma.user.update({
      where: {
        userId: payload.params.id,
      },
      data: {
        isDeleted: true,
      },
    });
    return result;
  } else {
    const result = await prisma.user.update({
      where: {
        userId: payload.params.id,
      },
      data: {
        status: "Block",
      },
    });
    return result;
  }
};

const adminService = {
  createCategory,
  manageCategory,
  manageShop,
  manageuser,
};
export default adminService;
