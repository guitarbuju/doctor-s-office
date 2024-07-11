

import { deleteById } from '../../../api/fetchData';
import { formatDate } from '../../../api/formatDate';

const RecipeList = ({ getRecipeList, onRemove }) => {
  const deleteUrl = `${import.meta.env.VITE_BASE_URL}/medicalcharts/deleterecipe`;

  const handleRemove = async (id) => {
    const removeItem = await deleteById(deleteUrl, id);
    console.log(removeItem);
    onRemove();  // Llama a la función para refrescar la lista
  };

  return (
    <div className="container p-2 mx-auto sm:p-4 text-gray-900">
      <h2 className="mb-4 text-lg font-semibold leading-tight ">
        {getRecipeList ? "Recipe List" : "The List is Temporarily Empty"}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left whitespace-nowrap">
          <thead>
            <tr className="text-sm bg-zinc-200">
              <th className="border-x border-y">Id</th>
              <th className="border-x border-y">Date</th>
              <th className="border-x border-y">Medicine</th>
              <th className="border-x border-y">Dosis</th>
              <th className="border-x border-y">Orders</th>
            </tr>
          </thead>
          <tbody className="border-gray-300">
            {getRecipeList?.data?.data?.map((recipe, index) => (
              <tr className="text-xs" key={index}>
                <td className="">
                  <p>{recipe.id}</p>
                </td>
                <td className="border-x border-y bg-zinc-100">
                  <p>{formatDate(recipe.date_created)}</p>
                </td>
                <td className="border-x border-y bg-zinc-100">
                  <p>{recipe.medicine_title}</p>
                </td>
                <td className="px-3 py-2 border-x border-y bg-zinc-100">
                  <p>{recipe.dosis}</p>
                </td>
                <td className="px-3 py-2 border-x border-y bg-zinc-100">
                  <span>{recipe.orders}</span>
                </td>
                <td className="flex justify-center align-middle">
                  <button
                    type="button"
                    className="h-6 bg-red-400 hover:bg-red-600 text-gray-100 px-2 rounded transition duration-150 text-xs"
                    onClick={() => handleRemove(recipe.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipeList;
