import publicClient from "../clients/public.client";
import privateClient from "../clients/private.client";

const toolsEndpoint = {
  tools: "/tools",
  toolsByStatus: ({ status }) => `/tools/${status}`,
  toolsTags: "/tools/tags",
  toolsApprovedByTagName: ({ tagName }) => `/tools/approved/${tagName}`,
  toolsUpdateStatus: ({ toolId }) => `/tools//update-status/${toolId}`,
};

const toolsApi = {
  getToolsByStatus: async ({ status }) => {
    try {
      const response = await publicClient.get(
        toolsEndpoint.toolsByStatus({ status })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getTags: async () => {
    try {
      const response = await publicClient.get(toolsEndpoint.toolsTags);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getApprovedToolsByTagName: async ({ tagName }) => {
    try {
      const response = await publicClient.get(
        toolsEndpoint.toolsApprovedByTagName({ tagName })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  addTool: async ({
    name,
    description,
    link,
    videoURL,
    imageURL,
    userProfileName,
    instagramURL,
    youtubeURL,
    tiktokURL,
    tagsIdList,
  }) => {
    try {
      const response = await privateClient.post(toolsEndpoint.tools, {
        name,
        description,
        link,
        videoURL,
        imageURL,
        userProfileName,
        instagramURL,
        youtubeURL,
        tiktokURL,
        tagsIdList,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  updateToolStatus: async ({ toolId, status }) => {
    try {
      const response = await privateClient.put(
        toolsEndpoint.toolsUpdateStatus({ toolId }),
        { status }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default toolsApi;
