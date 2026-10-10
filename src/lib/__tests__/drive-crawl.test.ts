import { createDriveCrawler } from "../drive-crawl.js";

const FOLDER_MIME = "application/vnd.google-apps.folder";

interface ListParams {
  q: string;
  fields?: string;
  pageSize?: number;
  orderBy?: string;
  pageToken?: string;
}

describe("crawlAbout pagination", () => {
  it("finds info.txt on the second page of a folder listing", async () => {
    const listCalls: ListParams[] = [];
    const listMock = jest.fn(async (params: ListParams) => {
      listCalls.push(params);
      if (params.q.includes("'root' in parents")) {
        return {
          data: {
            files: [{ id: "about-id", name: "About", mimeType: FOLDER_MIME }],
          },
        };
      }
      if (params.q.includes("'about-id' in parents")) {
        if (!params.pageToken) {
          return {
            data: {
              files: [
                { id: "notes-id", name: "notes.txt", mimeType: "text/plain" },
              ],
              nextPageToken: "token-2",
            },
          };
        }
        return {
          data: {
            files: [{ id: "info-id", name: "info.txt", mimeType: "text/plain" }],
          },
        };
      }
      return { data: { files: [] } };
    });
    const getMock = jest.fn(async () => ({
      data: "Name: Jane Doe\nTitle: Engineer\n",
    }));
    const fakeGoogle = {
      auth: { GoogleAuth: jest.fn().mockImplementation(() => ({})) },
      drive: jest
        .fn()
        .mockReturnValue({ files: { list: listMock, get: getMock } }),
    };

    const originalFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    process.env.GOOGLE_DRIVE_FOLDER_ID = "root";
    try {
      const { crawlAbout } = createDriveCrawler({ google: fakeGoogle });
      const about = await crawlAbout();

      expect(about?.name).toBe("Jane Doe");
      const aboutListCalls = listCalls.filter((p) =>
        p.q.includes("'about-id' in parents")
      );
      expect(aboutListCalls).toHaveLength(2);
      expect(aboutListCalls[0].fields).toContain("nextPageToken");
      expect(aboutListCalls[1].pageToken).toBe("token-2");
    } finally {
      if (originalFolderId === undefined) {
        delete process.env.GOOGLE_DRIVE_FOLDER_ID;
      } else {
        process.env.GOOGLE_DRIVE_FOLDER_ID = originalFolderId;
      }
    }
  });
});
